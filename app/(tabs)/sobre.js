import { Link } from 'expo-router';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Sobre() {
  return (
    <ScrollView style={styles.pagina} contentContainerStyle={{ flexGrow: 1 }}>

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
            <Text style={[styles.menuItem, styles.ativo]}>Sobre</Text>
          </Link>

          <Link href="/contato">
            <Text style={styles.menuItem}>Contato</Text>
          </Link>

          <Link href="/login">
            <Text style={styles.menuItem}>Login</Text>
          </Link>
        </View>
      </View>

      <View style={styles.container}>

        <Text style={styles.titulo}>
          Sobre Nós
        </Text>

        <Text style={styles.texto}>
          O Café Central nasceu com o propósito de oferecer uma experiência única em cafés especiais, unindo qualidade e conforto.
        </Text>

        <Text style={styles.tituloSecao}>
          Nossa missão
        </Text>

        <Text style={styles.texto}>
          Proporcionar experiências marcantes através de cafés artesanais preparados com excelência e paixão.
        </Text>

        <Text style={styles.tituloSecao}>
          Nossa essência
        </Text>

        <Text style={styles.texto}>
          • Qualidade em cada detalhe
        </Text>

        <Text style={styles.texto}>
          • Experiência acolhedora
        </Text>

        <Text style={styles.texto}>
          • Inovação no preparo de cafés
        </Text>

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
    padding: 20,
    alignItems: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  tituloSecao: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
  },

  texto: {
    textAlign: 'center',
    marginBottom: 8,
    backgroundColor: '#e1d9d1',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    fontSize: 12,
    marginBottom: 5,
  },

  linkRodape: {
    color: '#fff',
    fontWeight: 'bold',
  },

});