import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import EventoDatabase from "../Database/EventoDatabase";
import Evento from "../Models/Evento";

export default class Cadastro extends Component
{
    constructor(props) {
        super(props)
          this.state = {
          nomeEvento: "", 
          dataDia: "",
          hora: "",
          lugar: "",
          participantes: "",
          valorFinal: "",
          statusAtual: "",
        }
    }
    Cadastrar = (nomeEvento, dataDia, hora, lugar, participantes, valorFinal, statusAtual) => {
      const eventoNovo = new Evento(nomeEvento, dataDia, hora, lugar, participantes, valorFinal, statusAtual);
      const banco = new EventoDatabase ();
      banco.Inserir(eventoNovo)
    }

    render() {
        return(
            <View>
            <View>
                  <Text style={estilo.enunciado}>Cadastrar novo evento:</Text>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({nomeEvento: valorDigitado})}} placeholder="Nome do Evento" style={estilo.entradasDeDados}/>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({dataDia: valorDigitado})}} placeholder="AAAA-MM-DD" style={estilo.entradasDeDados}/>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({hora: valorDigitado})}} placeholder="HH:MM" style={estilo.entradasDeDados}/>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({lugar: valorDigitado})}} placeholder="Onde:" style={estilo.entradasDeDados}/>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({participantes: valorDigitado})}} placeholder="Quem vai:" style={estilo.entradasDeDados}/>
                  <TextInput onChangeText={(valorDigitado) => {this.setState({valorFinal: valorDigitado})}} placeholder="Custos" style={estilo.entradasDeDados}/>
                  {/* <TextInput onChangeText={(valorDigitado) => {this.setState({statusAtual: valorDigitado})}}placeholder="Status:" style={estilo.entradasDeDados}/> */}
                  <Button title="Salvar" style={estilo.botao} onPress={() => this.Cadastrar(this.state.nomeEvento, this.state.dataDia, this.state.hora, this.state.lugar, this.state.participantes, this.state.valorFinal, this.statusAtual)}/>
            </View>
            </View>
        )
    }
}
const estilo = StyleSheet.create({

    entradasDeDados:{

      borderBottomColor: 'black',
      borderWidth: 1,
      margin: 3,
      borderRadius: 10,

      
    },

    enunciado:{
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: 20,
      backgroundColor: '#00cf96',
      fontWeight: 'bold',
      
      
    },

    enunciado2:{
      flex:1,
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: 20,
      backgroundColor: '#bf0404',
      fontWeight: 'bold',
      marginTop: 25
      
    },

})