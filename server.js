// ======================================================
// CAFÉ CENTRAL MOBILE - SERVIDOR
// ======================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const conexao = require("./db.js");

const app = express();

// ======================================================
// CORS
// ======================================================

const listOrigins = [
    "http://localhost:8081",
    "http://localhost:5501",
    "http://127.0.0.1:5501",
    "http://localhost:19006",
    "https://rayanlucas640.github.io"
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permite Postman, React Native e outras requisições
        // que não enviam o header Origin.
        if (!origin) {
            return callback(null, true);
        }

        if (listOrigins.includes(origin)) {
            console.log("CORS permitido:", origin);
            return callback(null, true);
        }

        console.log("CORS bloqueado:", origin);

        return callback(null, false);
    },

    credentials: true,

    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With"
    ]
};

app.use(cors(corsOptions));

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// ======================================================
// SESSÃO
// ======================================================

const sessionConfig = {
    secret:
        process.env.SESSION_SECRET ||
        "chave_secreta_padrao",

    resave: false,

    saveUninitialized: false,

    name: "cafecentral.sid",

    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
};

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);

    sessionConfig.cookie.sameSite = "none";
    sessionConfig.cookie.secure = true;
} else {
    sessionConfig.cookie.sameSite = "lax";
    sessionConfig.cookie.secure = false;
}

app.use(session(sessionConfig));

// ======================================================
// ROTA PRINCIPAL
// ======================================================

app.get("/", (req, res) => {
    res.json({
        mensagem: "API CaféCentral Mobile funcionando",
        status: "online"
    });
});

// ======================================================
// CADASTRO
// ======================================================

app.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, senha } = req.body || {};

        console.log("Dados recebidos no cadastro:", {
            nome,
            email
        });

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Preencha todos os campos"
            });
        }

        const [rows] = await conexao.execute(
            "SELECT id FROM tb_usuarios WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(409).json({
                erro: "E-mail já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(
            senha,
            10
        );

        const sql = `
            INSERT INTO tb_usuarios
            (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        await conexao.execute(sql, [
            nome,
            email,
            senhaHash
        ]);

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso"
        });

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        return res.status(500).json({
            erro: "Erro ao cadastrar usuário!",
            detalhe: erro.message
        });
    }
});

// ======================================================
// LOGIN
// ======================================================

app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body || {};

        if (!email || !senha) {
            return res.status(400).json({
                erro: "Preencha todos os campos"
            });
        }

        const sql = `
            SELECT *
            FROM tb_usuarios
            WHERE email = ?
        `;

        const [resultado] =
            await conexao.execute(sql, [email]);

        if (resultado.length === 0) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos!"
            });
        }

        const usuario = resultado[0];

        const senhaCorreta =
            await bcrypt.compare(
                senha,
                usuario.senha
            );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Usuário ou senha inválidos!"
            });
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        return res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error("Erro no Login:", erro);

        return res.status(500).json({
            erro: "Erro ao realizar login",
            detalhe: erro.message
        });
    }
});

// ======================================================
// CONTATO
// ======================================================

app.post("/contato", async (req, res) => {
    try {
        const {
            nome,
            email,
            mensagem
        } = req.body || {};

        if (!nome || !email || !mensagem) {
            return res.status(400).json({
                erro: "Preencha todos os campos"
            });
        }

        const sql = `
            INSERT INTO tb_mensagem
            (nome, email, mensagem)
            VALUES (?, ?, ?)
        `;

        await conexao.execute(sql, [
            nome,
            email,
            mensagem
        ]);

        return res.json({
            mensagem: "Mensagem enviada com sucesso!"
        });

    } catch (erro) {
        console.error("Erro no contato:", erro);

        return res.status(500).json({
            erro: "Erro ao enviar mensagem",
            detalhe: erro.message
        });
    }
});

// ======================================================
// VERIFICAR SESSÃO
// ======================================================

app.get("/sessao", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            logado: false,
            mensagem: "Usuário não está logado"
        });
    }

    return res.json({
        logado: true,
        usuario: req.session.usuario
    });
});

// ======================================================
// LOGOUT
// ======================================================

app.post("/logout", (req, res) => {
    req.session.destroy((erro) => {
        if (erro) {
            console.error(
                "Erro ao fazer logout:",
                erro
            );

            return res.status(500).json({
                erro: "Erro ao fazer logout"
            });
        }

        res.clearCookie("cafecentral.sid");

        return res.json({
            mensagem: "Logout realizado com sucesso"
        });
    });
});

// ======================================================
// TRATAMENTO DE ERROS
// ======================================================

app.use((erro, req, res, next) => {
    console.error(
        "Erro no servidor:",
        erro
    );

    return res.status(500).json({
        erro: "Erro interno do servidor",
        detalhe: erro.message
    });
});

// ======================================================
// SERVIDOR
// ======================================================

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Servidor rodando na porta ${PORT}`
    );

    console.log(
        `Ambiente: ${
            process.env.NODE_ENV || "development"
        }`
    );
});
