import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Footer from '../../components/footer';
import Header from '../../components/header';


const API_URL = "http://localhost:3000";

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const router = useRouter();

  async function realizarLogin() {

    // VALIDAÇÕES
    if (email === '') {
      setMensagemSistema("Digite seu e-mail!");
      setTipoMensagem("erro");
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      setMensagemSistema("Digite um e-mail válido!");
      setTipoMensagem("erro");
      return;
    }

    if (senha === '') {
      setMensagemSistema("Digite sua senha!");
      setTipoMensagem("erro");
      return;
    }

    if (senha.length < 6) {
      setMensagemSistema("A senha deve ter pelo menos 6 caracteres!");
      setTipoMensagem("erro");
      return;
    }

    // API LOGIN
    try {
      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {

      setMensagemSistema(dados.mensagem || "Login realizado com sucesso!");
      setTipoMensagem("sucesso");

      setEmail('');
      setSenha('');

      router.push('/cardapio');

    } else {
      setMensagemSistema(dados.erro || "Erro ao fazer login");
      setTipoMensagem("erro");
    }

      } catch (erro) {
        setMensagemSistema("Erro ao conectar com o servidor");
        setTipoMensagem("erro");
      }

  } // ✅ SÓ FOI ADICIONADA ESSA CHAVE AQUI

  return (
    <ScrollView contentContainerStyle={styles.corpo}>

      {/* TOPO */}
      <Header ativo="login"></Header>

      {/* CONTEÚDO */}
      <View style={styles.container}>

        <Text style={styles.tituloPagina}>
          Faça seu Login
        </Text>

        <Text style={styles.subtitulo}>
          Entre com seu e-mail e senha.
        </Text>

        <View style={styles.card}>

          {/* EMAIL */}
          <View style={styles.campo}>

            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

          </View>

          {/* SENHA */}
          <View style={styles.campo}>

            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              autoCapitalize="none"
              value={senha}
              onChangeText={setSenha}
            />

          </View>

          {/* BOTÃO LOGIN */}
          <Link href='/login'>
          <TouchableOpacity
            style={styles.botao}
            onPress={realizarLogin}
          >

            <Text style={styles.textoBotao}>
              Entrar
            </Text>

          </TouchableOpacity>
          </Link>

          {/* LINK CADASTRO */}
          <Link href="/cadastro">

            <Text style={styles.linkCadastro}>
              Não possui conta? Cadastre-se
            </Text>

          </Link>

        </View>
      </View>

      {/* RODAPÉ */}
      <Footer></Footer>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

   corpo: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  topo: {
    backgroundColor: '#1f3b2c',
    padding: 20,
    alignItems: 'center',
  },

  logoP1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  logoP2: {
    color: '#c7a17a',
    fontSize: 24,
    fontWeight: 'bold',
  },

  menu: {
    marginTop: 10,
    alignItems: 'center',
    gap: 8,
  },

  menuItem: {
    color: '#fff',
    fontSize: 16,
  },

  ativo: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  container: {
    padding: 20,
  },

  tituloPagina: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitulo: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
    fontSize: 16,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
  },

  campo: {
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },

  botao: {
    marginTop: 10,
    backgroundColor: '#1f3b2c',
    padding: 14,
    borderRadius: 8,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  linkCadastro: {
    textAlign: 'center',
    marginTop: 18,
    color: '#1f3b2c',
    fontWeight: 'bold',
  },

  rodape: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1f3b2c',
    marginTop: 'auto',
  },

  textoRodape: {
    marginBottom: 10,
    color: '#ffffff',
  },

  linkRodape: {
    color: '#ffffff',
  },

});