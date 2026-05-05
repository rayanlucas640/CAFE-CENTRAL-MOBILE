import{
  View, // Para agrupar elementos (=div)
  Text, // Para exibir textos(= p, h1...)
  TouchableOpacity, // Para botões clicáveis (=button)
  ScrollView,       // Para a área principal com scroll
} from 'react-native'; // Importa os componentes View e Text do React Native
 
export default function Index() { // Define e exporta o componente principal da tela
  return(
    <ScrollView>
      {/* TOPO (HEADER) */}
      <View>
        <Text>Café Central</Text>
     
 
      <View>
        <Text> Início </Text>
        <Text> Sobre </Text>
        <Text> Contato </Text>
        <Text> Login </Text>
     
 
    <TouchableOpacity>
      <Text>Login</Text>
    </TouchableOpacity>
 
      </View>
    </View>
 
    {/* HERO */}
    <View>
      <Text>
        Nosso Site da Loja Oficial Café Central
        </Text>
 
      <Text>
        Aprecie lanche e cafés super relaxantes.
      </Text>
 
      <Text>
        Para visualizar os cursos, é necessário fazer Login
      </Text>
 
      <TouchableOpacity>
        <Text>Fazer Login</Text>
      </TouchableOpacity>
 
      <TouchableOpacity>
      <Text>Fale Conosco</Text>
      </TouchableOpacity>
 
    </View>
 
    {/* DESTAQUES */}
    <View>
      <Text>Porque comprar na café central?</Text>
   
    <View>
      <Text>Cafés feitos na hora</Text>
      <Text>
        Você escolhe todos os ingredientes que vai ser possivel adicionar no seu café ou lanche.
      </Text>
    </View>
 
    <View>
      <Text>servicos totalmente naturais</Text>
      <Text>
      Nosso servicos não passam por industrialização é colhido a mão sem servicos quimicos que diminuem sua vida.
      </Text>
    </View>
 
    {/* RODAPÉ */}
    <View>
      <Text> ®2026 Café Central. Todos direitos reservados</Text>
 
      <Text>Entre em contato</Text>
    </View>
 
    </View>
    </ScrollView>
  );
}
 