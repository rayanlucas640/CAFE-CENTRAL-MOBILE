import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';

export default function DetalhesCardapio() {

  const {
    titulo,
    descricao,
    preco,
    conteudos,
  } = useLocalSearchParams();

  const precoNumerico = Number(String(preco || 0).replace(',', '.'));
  const precoFormatado = isNaN(precoNumerico) ? '0.00' : precoNumerico.toFixed(2);

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.corpo}>

      <View style={styles.topo}>

        <Link href="/">
          <View>
            <Text style={styles.logoP1}>Café</Text>
            <Text style={styles.logoP2}>Central</Text>
          </View>
        </Link>

        <View style={styles.menu}>

          <Link href="/">
            <Text style={styles.menuItem}>Início</Text>
          </Link>

          <Link href="/sobre">
            <Text style={styles.menuItem}>Sobre</Text>
          </Link>

          <Link href="/cardapio">
            <Text style={[styles.menuItem, styles.ativo]}>Cardápio</Text>
          </Link>

          <Link href="/contato">
            <Text style={styles.menuItem}>Contato</Text>
          </Link>

        </View>
      </View>

      <View style={styles.container}>

        <View style={styles.cardDetalhes}>

          <Text style={styles.etiqueta}>
            Café Central
          </Text>

          <Text style={styles.tituloCurso}>
            {titulo}
          </Text>

          <Text style={styles.descricaoCurso}>
            {descricao}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Preço</Text>
            <Text style={styles.infoValor}>
              R$ {precoFormatado}
            </Text>
          </View>

          <View style={styles.secaoDetalhe}>
            <Text style={styles.subtitulo}>Conteúdos</Text>
            <Text style={styles.textoDetalhe}>
              {conteudos}
            </Text>
          </View>

          <TouchableOpacity style={styles.btnComprar}>
            <Text style={styles.textoBtnComprar}>
              Comprar
            </Text>
          </TouchableOpacity>

          <Link href="/cardapio" asChild>
            <TouchableOpacity style={styles.btnVoltar}>
              <Text style={styles.textoBtn}>
                Voltar para Cardápio
              </Text>
            </TouchableOpacity>
          </Link>

        </View>
      </View>

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
    width: '100%',
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  cardDetalhes: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  etiqueta: {
    backgroundColor: '#c7a17a',
    color: '#fff',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },

  tituloCurso: {
    color: '#1f3b2c',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  descricaoCurso: {
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  infoLabel: {
    color: '#1f3b2c',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },

  infoValor: {
    color: "#333",
    fontSize: 16,
    textAlign: 'center',
  },

  secaoDetalhe: {
    marginBottom: 20,
  },

  subtitulo: {
    color: '#1f3b2c',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },

  textoDetalhe: {
    textAlign: 'center',
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
  },

  btnVoltar: {
    backgroundColor: '#1f3b2c',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },

  btnComprar: {
    backgroundColor: '#c7a17a',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center'
  },

  textoBtn: {
    color: 'white',
    fontWeight: 'bold',
  },

  textoBtnComprar: {
    color: '#1f3b2c',
    fontWeight: 'bold',
    fontSize: 16,
  },

  rodape: {
    width: '100%',
    backgroundColor: '#1f3b2c',
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },

  textoRodape: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  linkRodape: {
    color: '#c7a17a',
    fontWeight: 'bold',
  },

});