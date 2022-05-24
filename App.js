import React, { Component } from "react";
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
console.disableYellowBox = true;

const Tab = createBottomTabNavigator();
import Cadastro from "./src/Telas/Cadastro";
import Listagem from "./src/Telas/Listagem";
import Icon from 'react-native-vector-icons/Ionicons';



export default class App extends Component
{
render() {
 return(
  
  <NavigationContainer>
    <Tab.Navigator 
      initialRouteName=""
      screenOptions={({route}) => ({
      tabBarIcon: ({ focused, color, size}) => {
        let iconName;
        if (route.name === "Listagem") {
          iconName = focused
          ? 'list'
          : 'list-outline'
        } else if (route.name === "Cadastro") {
          iconName = focused
          ? 'pencil'
          : 'pencil-outline'
        } 
        return <Icon name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: 'deepskyblue',
      tabBarInactiveTintColor: 'black'
    })}
    >
      <Tab.Screen name='Listagem' component={Listagem} />
      <Tab.Screen name='Cadastro' component={Cadastro} />
    </Tab.Navigator>
  </NavigationContainer>

 )
}
}




// export default class App extends Component
// {


//   constructor (props) {
//     super(props)
//       this.state = {
//       descricao: "",
//       dataTermino: "",
//       prioridade: "",
//       statusAtual: "No prazo",
//       lista: []
//     }

//     this.Listar()
//   }

//     //Controller =
//     Listar = () => {
//       const banco = new EventoDatabase ();
//       banco.Listar().then(
//         eventoCompleta => {
//           this.setState({lista: eventoCompleta})
//         }
//       )
//     }

//     Cadastrar = (descricao, dataTermino, prioridade, statusAtual) => {
//       const eventoNova = new Evento(descricao, dataTermino, prioridade, statusAtual);
//       const banco = new EventoDatabase ();
//       banco.Inserir(eventoNova)
//       this.Listar()
//     }

//     Atrasar = (evento) => {
//     const banco = new EventoDatabase();
//     banco.Atrasar(evento)
//     this.Listar()
//     }

//     Atualizar = (evento) => {
//       const banco = new EventoDatabase();
//       banco.Concluir(evento)
//       this.Listar()
//     }

//     Remover = (id) => {
//     const banco = new EventoDatabase();
//     banco.Remover(id)
//     this.Listar()
//     }

//     ConectarEvento = () => {
//     const banco = new EventoDatabase();
//     banco.Conectar()
//     }

//     render() {
//     return(
//       <ScrollView>

//         <View>
//               <Text style={estilo.enunciado}>Cadastrar nova evento:</Text>
//               <TextInput onChangeText={(valorDigitado) => {this.setState({descricao: valorDigitado})}} placeholder="Descrição:" style={estilo.entradasDeDados}/>
//               <TextInput onChangeText={(valorDigitado) => {this.setState({dataTermino: valorDigitado})}}placeholder="Data e hora de término:" style={estilo.entradasDeDados}/>
//               <TextInput onChangeText={(valorDigitado) => {this.setState({prioridade: valorDigitado})}}placeholder="Prioridade:" style={estilo.entradasDeDados}/>
//               {/* <TextInput onChangeText={(valorDigitado) => {this.setState({statusAtual: valorDigitado})}}placeholder="Status:" style={estilo.entradasDeDados}/> */}
//               <Button title="Salvar" style={estilo.botao} onPress={() => this.Cadastrar(this.state.descricao, this.state.dataTermino, this.state.prioridade, this.statusAtual,)}/>
//         </View>

//         <ScrollView>
//           <Text style={estilo.enunciado2}>Lista de Evento:</Text>
//           {
//             this.state.lista.map(
//               evento => (
//                 <EventoComponent
//                     evento={evento}
//                     key={evento.id}
//                     id={evento.id}
//                     descricao={evento.descricao} 
//                     dataTermino={evento.dataTermino}
//                     prioridade={evento.prioridade}
//                     statusAtual={evento.statusAtual}
//                     atualizar={this.Atualizar}
//                     atrasar={this.Atrasar}
//                     deletar={this.Remover}
//                 />
//               )
//             )
//           }
//         </ScrollView>

//       </ScrollView>
//     )
//   }
// }



// const estilo = StyleSheet.create({

//     entradasDeDados:{

//       borderBottomColor: 'black',
//       borderWidth: 1,
//       margin: 3,
//       borderRadius: 10,

      
//     },

//     enunciado:{
//       justifyContent: 'center',
//       textAlign: 'center',
//       color: 'white',
//       fontSize: 20,
//       backgroundColor: '#00cf96',
//       fontWeight: 'bold',
      
      
//     },

//     enunciado2:{
//       flex:1,
//       justifyContent: 'center',
//       textAlign: 'center',
//       color: 'white',
//       fontSize: 20,
//       backgroundColor: '#bf0404',
//       fontWeight: 'bold',
//       marginTop: 25
      
//     },

// })