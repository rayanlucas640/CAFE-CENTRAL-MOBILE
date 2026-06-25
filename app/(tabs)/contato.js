import { Link } from 'expo-router';
import { useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = "http://localhost:3000";

export default function Contato() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  async function enviarFormulario() {

    // VALIDAÇÕES
    if (nome === '') {
      setMensagemSistema("Digite seu nome!");
      setTipoMensagem("erro");
      return;
    }

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

    if (mensagem === '') {
      setMensagemSistema("Digite uma mensagem!");
      setTipoMensagem("erro");
      return;
    }

    if (mensagem.length < 10) {
      setMensagemSistema("A mensagem deve ter pelo menos 10 caracteres!");
      setTipoMensagem("erro");
      return;
    }

    // API (opcional se backend existir)
    try {
      const resposta = await fetch(`${API_URL}/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          nome,
          email,
          mensagem
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {

        setMensagemSistema(dados.mensagem || `Obrigado ${nome}, mensagem enviada!`);
        setTipoMensagem("sucesso");

        setNome('');
        setEmail('');
        setMensagem('');

      } else {
        setMensagemSistema(dados.erro || "Erro ao enviar mensagem");
        setTipoMensagem("erro");
      }

    } catch (erro) {
      setMensagemSistema("Erro ao conectar com o servidor");
      setTipoMensagem("erro");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.corpo}>

      {/* TOPO */}
      <Header ativo="contato"></Header>

      {/* CONTEÚDO */}
      <View style={styles.container}>
        <Text style={styles.tituloPagina}>Fale Conosco</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite sua mensagem"
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />

        <TouchableOpacity style={styles.botao} onPress={enviarFormulario}>
          <Text style={styles.textoBotao}>Enviar Mensagem</Text>
        </TouchableOpacity>

        {/* Mensagem de validação visível na tela */}
        {mensagemSistema !== '' && (
          <Text style={{ marginTop: 10, textAlign: 'center', color: mensagemSistema.startsWith('Erro') ? 'red' : 'green' }}>
            {mensagemSistema}
          </Text>
        )}
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
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    textAlign: 'center',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: '#1f3b2c',
    padding: 12,
    borderRadius: 8,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
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