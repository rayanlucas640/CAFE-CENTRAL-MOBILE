import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Link, useRouter } from 'expo-router';
import Header from '../../components/header';
import Footer from '../../components/footer';

const API_URL = "http://localhost:3000";

export default function Cadastro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const router = useRouter();

  async function realizarCadastro() {

    // VALIDAÇÕES
    if (nome === '') {
      setMensagemSistema("Digite seu nome!");
      setTipoMensagem("erro");
      return;
    }

    if (/\d/.test(nome)) {
      setMensagemSistema("O nome não pode conter números!");
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

    // API
    try {
      const resposta = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {

        setMensagemSistema(dados.mensagem || "Cadastro realizado com sucesso!");
        setTipoMensagem("sucesso");

        setNome('');
        setEmail('');
        setSenha('');

        // redireciona após sucesso
        setTimeout(() => {
          router.push('/login');
        }, 800);

      } else {
        setMensagemSistema(dados.erro || "Erro ao cadastrar");
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
      <Header ativo="cadastro"></Header>

      {/* CONTEÚDO */}
      <View style={styles.container}>

        <Text style={styles.tituloPagina}>
          Faça seu Cadastro
        </Text>

        <Text style={styles.subtitulo}>
          Preencha os campos abaixo para criar sua conta.
        </Text>

        <View style={styles.card}>

          {/* NOME */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />
          </View>

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

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.botao}
            onPress={realizarCadastro}
          >
            <Text style={styles.textoBotao}>Cadastrar</Text>
          </TouchableOpacity>

          {/* Mensagem de validação visível na tela */}
          {mensagemSistema !== '' && (
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                color: tipoMensagem === 'erro' ? 'red' : 'green'
              }}
            >
              {mensagemSistema}
            </Text>
          )}

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