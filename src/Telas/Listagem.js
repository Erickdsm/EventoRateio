import React, { Component } from "react";
import { View, TouchableOpacity, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import EventoDatabase from "../Database/EventoDatabase";
import EventoComponent from "../Components/EventoComponent";
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
console.disableYellowBox = true;

export default class Listagem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lista: []

    }
    this.Listar()

  }
  Listar = () => {
    const banco = new EventoDatabase();
    banco.Listar().then(
      eventoCompleta => {
        this.setState({ lista: eventoCompleta })
      }
    )
  }

  Atualizar = (evento) => {
    const banco = new EventoDatabase();
    banco.Concluir(evento)
    this.Listar()
  }

  Concluir = (evento) => {
    const banco = new EventoDatabase();
    banco.Concluir(evento)
    this.Listar()
  }

  Remover = (id) => {
    const banco = new EventoDatabase();
    banco.Remover(id)
    this.Listar()
  }

  Atrasar = (evento) => {
    const banco = new EventoDatabase();
    banco.Atrasar(evento)
    this.Listar()
  }



  render() {
    return (
      
      <View>
        {/* <Icon name="rocket" size={30} color="#900" />
          <Octicons name="rocket" size={30} color="#900" /> */}
        <Text style={estilo.enunciado2}><Ionicons name="list" size={18} color="white" /> Lista de Eventos: </Text>
        <TouchableOpacity  onPress={() => this.Listar()}>
          <Text style={estilo.atualizarlista}>Atualizar lista<Ionicons name="refresh" size={18}/></Text>
        </TouchableOpacity>

          {/* <View style={{flex: 1}}>

            <FlatList
            data = {this.state.lista}
            renderItem = {(evento) => (
              <EventoComponent
                  evento={evento}
                  key={evento.id}
                  id={evento.id}
                  nomeEvento={evento.nomeEvento}
                  dataDia={evento.dataDia}
                  hora={evento.hora}
                  lugar={evento.lugar}
                  participantes={evento.participantes}
                  valorFinal={evento.valorFinal}
                  statusAtual={evento.statusAtual}
                  valorPessoa={evento.valorPessoa}
                  atualizar={this.Atualizar}
                  atrasar={this.Atrasar}
                  deletar={this.Remover}
                />
            )}
            keyExtractor = {(item) => String(item.id)}
            />
          </View> */}
        <ScrollView style={estilo.box}>
          {
            this.state.lista.map(
              evento => (
                <EventoComponent
                  evento={evento}
                  key={evento.id}
                  id={evento.id}
                  nomeEvento={evento.nomeEvento}
                  dataDia={evento.dataDia}
                  hora={evento.hora}
                  lugar={evento.lugar}
                  participantes={evento.participantes}
                  valorFinal={evento.valorFinal}
                  statusAtual={evento.statusAtual}
                  valorPessoa={evento.valorPessoa}
                  atualizar={this.Atualizar}
                  atrasar={this.Atrasar}
                  deletar={this.Remover}
                />
              )
            )
          }
        </ScrollView>
      </View>
      
    )
  }
}
const estilo = StyleSheet.create({

  entradasDeDados: {

    borderBottomColor: 'black',
    borderWidth: 1,
    margin: 3,
    borderRadius: 10,


  },

  enunciado: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    backgroundColor: '#00cf96',
    fontWeight: 'bold',


  },

  atualizarlista: {

    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 20,
    backgroundColor: '#f0ea41',
    fontWeight: 'bold',
    marginTop: 25

  },

  enunciado2: {

    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    backgroundColor: '#0e80cc',
    fontWeight: 'bold',
    marginTop: 25

  },

  box: {
    marginBottom: 100,
    padding: 5,
    margin: 15,
    borderRadius: 10,

  }



})