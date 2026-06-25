import {View, Text, StyleSheet} from 'react-native'
import {Link} from 'expo-router'

export default function Header({ativo}){
    return(
        <View style={styles.topo}>
                <Link href="/">
                  <View>
                    <Text style={styles.logoP1}>Café</Text>
                    <Text style={styles.logoP2}>Central</Text>
                  </View>
                </Link>
        
                <View style={styles.menu}>
                  <Link href='/'>
                    <Text style={[styles.menuItem, ativo ==="inicio" && styles.ativo]}>Início</Text>
                  </Link>
                  <Link href='/sobre'>
                    <Text style={[styles.menuItem, ativo ==="sobre" && styles.ativo]}>Sobre</Text>
                  </Link>
                  <Link href='/contato'>
                    <Text style={[styles.menuItem, ativo === "contato" && styles.ativo]}>Contato</Text>
                  </Link>
                  <Link href='/login'>
                    <Text style={[styles.menuItem, ativo === "login" && styles.ativo]}>Login</Text>
                  </Link>
                  <Link href='/cardapio'>
                    <Text style={[styles.menuItem, ativo === "cardapio" && styles.ativo]}>Cardapio</Text>
                  </Link>
                </View>
              </View>
    )
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#f9f9f9',
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
  }
})