import {View, Text, StyleSheet} from 'react-native'
import {Link} from 'expo-router'

export default function Footer(){
    return(
        <View style={styles.rodape}>
            <Text style={styles.txtRodape}>®2026 Café Central. Todos direitos reservados</Text>
                <Link href='/contato'>
                    <Text style={styles.txtRodapeLink}>Entre em contato</Text>
                </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    rodape: {
    backgroundColor: '#1f3b2c',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginTop:'auto',
  },
  txtRodape: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  txtRodapeLink: {
    fontSize: 12,
    color: '#a3e635',
    fontWeight: 'bold',
  }
})