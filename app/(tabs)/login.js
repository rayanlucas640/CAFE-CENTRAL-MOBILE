import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Footer from '../../components/footer';
import Header from '../../components/header';

const API_URL = 'https://cafe-central-8lgi.onrender.com';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function realizarLogin() {
    // Evita vários cliques enquanto o login está acontecendo
    if (carregando) {
      return;
    }

    // Limpa mensagem anterior
    setMensagemSistema('');
    setTipoMensagem('');

    // VALIDAÇÕES
    if (email.trim() === '') {
      setMensagemSistema('Digite seu e-mail!');
      setTipoMensagem('erro');
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setMensagemSistema('Digite um e-mail válido!');
      setTipoMensagem('erro');
      return;
    }

    if (senha === '') {
      setMensagemSistema('Digite sua senha!');
      setTipoMensagem('erro');
      return;
    }

    if (senha.length < 6) {
      setMensagemSistema('A senha deve ter pelo menos 6 caracteres!');
      setTipoMensagem('erro');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagemSistema(
          dados.erro || dados.mensagem || 'E-mail ou senha incorretos.'
        );
        setTipoMensagem('erro');
        return;
      }

      // Login realizado com sucesso
      setMensagemSistema(
        dados.mensagem || 'Login realizado com sucesso!'
      );
      setTipoMensagem('sucesso');

      // Limpa os campos
      setEmail('');
      setSenha('');

      // Pequeno atraso para garantir que a resposta terminou
      // antes da navegação
      setTimeout(() => {
        router.replace('/cardapio');
      }, 300);
    } catch (erro) {
      console.error('Erro no login:', erro);

      setMensagemSistema(
        'Não foi possível conectar com o servidor.'
      );
      setTipoMensagem('erro');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={styles.pagina}
      contentContainerStyle={styles.corpo}
      keyboardShouldPersistTaps="handled"
    >
      {/* TOPO */}
      <Header ativo="login" />

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
            <Text style={styles.label}>
              E-mail
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!carregando}
            />
          </View>

          {/* SENHA */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Senha
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={senha}
              onChangeText={setSenha}
              editable={!carregando}
            />
          </View>

          {/* MENSAGEM DO SISTEMA */}
          {mensagemSistema !== '' && (
            <Text
              style={
                tipoMensagem === 'sucesso'
                  ? styles.mensagemSucesso
                  : styles.mensagemErro
              }
            >
              {mensagemSistema}
            </Text>
          )}

          {/* BOTÃO LOGIN */}
          {/* IMPORTANTE:
              Não colocar Link em volta deste botão.
              O próprio realizarLogin controla a navegação.
          */}
          <TouchableOpacity
            style={[
              styles.botao,
              carregando && styles.botaoDesativado,
            ]}
            onPress={realizarLogin}
            disabled={carregando}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          {/* LINK CADASTRO */}
          <Link href="/cadastro" asChild>
            <TouchableOpacity disabled={carregando}>
              <Text style={styles.linkCadastro}>
                Não possui conta? Cadastre-se
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* RODAPÉ */}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#fff',
  },

  corpo: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
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
    backgroundColor: '#fff',
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
    fontSize: 16,
  },

  mensagemErro: {
    color: '#c62828',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },

  mensagemSucesso: {
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },

  botao: {
    marginTop: 10,
    backgroundColor: '#1f3b2c',
    padding: 14,
    borderRadius: 8,
  },

  botaoDesativado: {
    opacity: 0.6,
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
});
