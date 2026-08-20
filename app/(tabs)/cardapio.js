import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';

import { useState } from 'react';
import { Link } from 'expo-router';

import cardapioJson from '../../assets/data/cardapio.json';

export default function Cardapios() {

  const imagensCardapio = {
    'bolo.jpg': require('../../assets/images/bolo.jpg'),
    'capp.jpg': require('../../assets/images/capp.jpg'),
    'cafe.jpg': require('../../assets/images/cafe.jpg'),
    'cafeg.jpg': require('../../assets/images/cafeg.jpg'),
    'cafem.jpg': require('../../assets/images/cafem.jpg'),
    'misto.jpg': require('../../assets/images/misto.jpg'),
    'cheesecake.jpg': require('../../assets/images/cheesecake.jpg'),
    'chocolate.jpg': require('../../assets/images/chocolate.jpg'),
    'cookie.jpg': require('../../assets/images/cookie.jpg'),
    'croissant.jpg': require('../../assets/images/croissant.jpg'),
    'mocha.jpg': require('../../assets/images/mocha.jpg'),
    'paodequeijo.jpg': require('../../assets/images/paodequeijo.jpg'),
  };

  const cardapio = cardapioJson.map((item) => ({
    ...item,
    img: imagensCardapio[item.img],
  }));

  const [busca, setBusca] = useState('');

  const cardapiosFiltrados = cardapio.filter((item) => {
    return item.titulo
      .toLowerCase()
      .includes(busca.toLowerCase());
  });

  return (

    <ScrollView style={styles.pagina} contentContainerStyle={styles.corpo}>

      {/* TOPO */}
      <View style={styles.topo}>

        <Link href="/">
          <View>
            <Text style={styles.logoP1}>Café</Text>
            <Text style={styles.logoP2}>Central</Text>
          </View>
        </Link>

        <View style={styles.menu}>

          <Link href="/">
            <Text style={styles.menuItem}>
              Início
            </Text>
          </Link>

          <Link href="/sobre">
            <Text style={styles.menuItem}>
              Sobre
            </Text>
          </Link>

          <Link href="/cardapio">
            <Text style={[styles.menuItem, styles.ativo]}>
              Cardápio
            </Text>
          </Link>

          <Link href="/contato">
            <Text style={styles.menuItem}>
              Contato
            </Text>
          </Link>

        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.container}>

        <Text style={styles.tituloPagina}>
          Nosso Cardápio
        </Text>

        <TextInput
          style={styles.buscarCardapio}
          placeholder="Buscar item"
          value={busca}
          onChangeText={setBusca}
        />

        <FlatList
          data={cardapiosFiltrados}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}

          renderItem={({ item }) => (

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                {item.titulo}
              </Text>

              <Image
                source={item.img}
                style={styles.imagem}
              />

              <Text style={styles.descricao}>
                {item.descricao}
              </Text>

              <Text style={styles.preco}>
                R$ {item.preco.toFixed(2)}
              </Text>

              <Link
                href={{
                  pathname: '/detalhesCardapio',

                  params: {
                    titulo: item.titulo,
                    descricao: item.descricao,
                    preco: item.preco,
                    conteudos: item.conteudos,
                  }
                }}

                asChild
              >

                <TouchableOpacity style={styles.botao}>

                  <Text style={styles.textoBotao}>
                    Ver detalhes
                  </Text>

                </TouchableOpacity>

              </Link>

            </View>

          )}

        />

      </View>

      {/* RODAPÉ */}
      <View style={styles.rodape}>

        <Text style={styles.textoRodape}>
          © 2026 Café Central. Todos os direitos reservados.
        </Text>

        <Link href="/contato">

          <Text style={styles.linkRodape}>
            Entre em contato
          </Text>

        </Link>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  pagina: {
    flex: 1,
  },

  corpo: {
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
    flex: 1,
    padding: 20,
  },

  tituloPagina: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  buscarCardapio: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 8,
  },

  cardTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },

  descricao: {
    fontSize: 12,
    marginBottom: 10,
  },

  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f3b2c',
  },

  botao: {
    marginTop: 10,
    backgroundColor: '#1f3b2c',
    padding: 8,
    borderRadius: 8,
  },

  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },

  rodape: {
    width: '100%',
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