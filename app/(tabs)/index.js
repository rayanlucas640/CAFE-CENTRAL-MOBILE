import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
 
export default function Index() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      {/* TOPO (HEADER) */}
      <View style={styles.topo}>
        <View>
            <Text style={styles.logoP1}>Café</Text>
            <Text style={styles.logoP2}>Central</Text>
          </View>
        <View style={styles.menu}>
          <Link href='/'>
            <Text style={[styles.menuItem, styles.ativo]}> Início </Text>
          </Link>
          <Link href='/sobre'>
            <Text style={styles.menuItem}> Sobre </Text>
          </Link>
          <Link href='/contato'>
            <Text style={styles.menuItem}> Contato </Text>
          </Link>
          <Link href='/login'>
            <Text style={styles.menuItem}> Login </Text>
          </Link>
        </View>
      </View>
 
      {/* HERO */}
      <View style={styles.principal}>
        <View style={styles.titulosCabc}>
          <Text style={styles.tituloCabc}>Seja Bem-Vindo ao Nosso Aplicativo da Café Central</Text>
 
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.btnPrimario}>
              <Text style={styles.textoBotao}>Fazer Login</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.btnSecundario}>
              <Text style={styles.textoBotao}>Fale Conosco</Text>
            </TouchableOpacity>
          </View>
 
          <Text style={styles.subCabc}>Porque comprar na Café Central</Text>
        </View>
 
        {/* SEÇÃO DE CARDS (DESTAQUES) */}
        <View style={styles.containerCards}>
         
          {/* CARD 1 */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Cafés feitos na hora</Text>
            <Text style={styles.textoCard}>
              Você escolhe todos os ingredientes. Será possível adicionar no seu café ou lanche.
            </Text>
          </View>
 
          {/* CARD 2 */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Serviços totalmente naturais</Text>
            <Text style={styles.textoCard}>
              Nossos serviços não passam por industrialização. É colhido à mão, sem processos químicos.
            </Text>
          </View>
 
          {/* CARD 3 */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Atendimento online imediato</Text>
            <Text style={styles.textoCard}>
              Nossos atendimentos são respondidos de imediato para não haver enrolação na hora de pedir o seu café.
            </Text>
          </View>
 
        </View>
 
        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <Text style={styles.txtRodape}>®2026 Café Central. Todos direitos reservados</Text>
          <Link href='/contato'>
            <Text style={styles.txtRodapeLink}>Entre em contato</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9', // Um fundo levemente cinza destaca os cards brancos
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
  principal: {
    padding: 24,
    justifyContent: 'space-between',
  },
  titulosCabc: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  tituloCabc: {
    color: '#1f3b2c',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subCabc: {
    color: '#1f3b2c',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnPrimario: {
    flex: 1,
    backgroundColor: '#1f3b2c',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15
  },
  btnSecundario: {
    flex: 1,
    backgroundColor: '#669982',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15
  },
  textoBotao: {
    color: '#f6f6f6',
    fontWeight: 'bold',
  },
 
  /* --- ESTILOS DOS CARDS --- */
  containerCards: {
    gap: 16, // Espaçamento entre um card e outro
    marginBottom: 30,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#e1d9d1',
    borderRadius: 12,
    padding: 16,
    // Efeito de sombra para Android:
    elevation: 3,
    // Efeito de sombra para iOS:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Borda sutil opcional:
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tituloCard: {
    color: '#1f3b2c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoCard: {
    color: '#4b5563', // Um cinza escuro para melhor leitura
    fontSize: 14,
    lineHeight: 20,
  },
 
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
  },
});
 