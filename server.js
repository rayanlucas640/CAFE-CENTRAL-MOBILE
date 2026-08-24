// Carrega as variáveis de ambiente ANTES de qualquer outra coisa
require("dotenv").config();
const express = require("express"); // Framework principal
const cors = require("cors"); // Controle de origens
const session = require("express-session"); // Gerenciamento de sessões
const bcrypt = require("bcryptjs"); // Criptografia de senhas
const conexao = require("./db.js"); // Pool de conexões MySQL

// Cria a instância do servidor Express
const app = express();

// Lista de origens permitidas para acessar a API
const listOrigins = [
    "http://localhost:8081", // Expo no computador
    "http://localhost:5501", // Live Server do VS Code
    "http://127.0.0.1:5501", // Variação do Live Server
    "http://localhost:19006",
    "https://rayanlucas640.github.io" // Deploy no GitHub Pages
];

app.use(cors({
    origin: (origin, callback) => {
        // Permite requisições sem origin (mobile nativo/Postman) ou da lista
        if (!origin || listOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Configurações da API
app.use(express.json()); // Habilita leitura de dados JSON no corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Configuração do objeto sessão
const sessionConfig = {
    secret: process.env.SESSION_SECRET || "chave_secreta_padrao",
    resave: false,
    saveUninitialized: false,
    name: 'cafecentral.sid',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hora
    }
};

// Ambiente Local X Produção
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    sessionConfig.cookie.sameSite = "none";
    sessionConfig.cookie.secure = true;
} else {
    sessionConfig.cookie.sameSite = "lax";
    sessionConfig.cookie.secure = false;
}

app.use(session(sessionConfig));

// Primeira Rota (PRINCIPAL)
app.get("/", (req, res) => {
    res.send("API CaféCentral Mobile funcionando"); 
});

// Rota de Cadastro
app.post("/cadastro", async (req, res) => {
    try { 
        const { nome, email, senha } = req.body || {};
        console.log("Dados recebidos no cadastro:", req.body);
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        // Verifica se já existe usuário com esse e-mail
        const [rows] = await conexao.execute(
            "SELECT id FROM tb_usuarios WHERE email=?", [email]
        );

        if (rows.length > 0) {
            return res.status(409).json({ erro: "E-mail já cadastrado" });
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco
        const sql = `INSERT INTO tb_usuarios (nome, email, senha) VALUES (?, ?, ?)`;
        await conexao.execute(sql, [nome, email, senhaHash]);

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" }); 
        
    } catch (erro) {
        console.error("Erro no cadastro:", erro);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário!", detalhe: erro.message });
    }
});

// Rota de Login
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body || {};
        
        if (!email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const sql = `SELECT * FROM tb_usuarios WHERE email=?`;
        const [resultado] = await conexao.execute(sql, [email]);

        if (resultado.length === 0) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
        }

        const usuario = resultado[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha); 
        
        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Senha inválida" });
        }
    
        return res.json({ mensagem: "Login realizado com sucesso!" });
    
    } catch (erro) {
        console.error("Erro no Login:", erro);
        return res.status(500).json({ erro: "Erro ao realizar login", detalhe: erro.message });
    }
});

// Rota de Contato
app.post("/contato", async (req, res) => {
    try {
        const { nome, email, mensagem } = req.body || {};

        if (!nome || !email || !mensagem) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const sql = `INSERT INTO tb_mensagem (nome, email, mensagem) VALUES (?, ?, ?)`;
        await conexao.execute(sql, [nome, email, mensagem]);

        return res.json({ mensagem: "Mensagem enviada com sucesso!" });

    } catch (erro) {
        console.error("Erro no contato:", erro);
        return res.status(500).json({ erro: "Erro ao enviar mensagem", detalhe: erro.message });
    }
});

// Porta dinâmica (essencial para o Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});