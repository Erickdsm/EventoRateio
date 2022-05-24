import React, { Component } from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {removeMaskMoney, money} from '../Mask';



export default class EventoComponent extends Component {

    getEstilo() {
        if (this.props.statusAtual == 'Concluído') {
            return { color: '#1fdb8a' }
        } else if (this.props.statusAtual == 'Adiado') {
            return { color: 'orange' }
        } else if (this.props.statusAtual == 'Pendente') {
            return { color: 'blue' }
        } else {
            return { color: 'black' }
        }

    }

    onCalcular = () => {
        const vp = removeMaskMoney(this.props.valorFinal) / this.props.participantes
        console.log(vp)
        console.log(removeMaskMoney(this.props.valorFinal))
        console.log(this.props.participantes)
        return money(vp) 

    }

    render() {
        return (
            
            <ScrollView style={estilo.box}>
                <Text>Nome do evento: {this.props.nomeEvento}</Text>
                <Text>Dia: {this.props.dataDia}</Text>
                <Text>Hora: {this.props.hora}</Text>
                <Text>Onde: {this.props.lugar}</Text>
                <Text>Número de participantes: {this.props.participantes}</Text>
                <Text>Valor total: {this.props.valorFinal}</Text>
                <Text>Valor por pessoa: {this.onCalcular()}</Text>
                <Text style={this.getEstilo()}>Status: {this.props.statusAtual}</Text>

                <View style={estilo.areaBotao}>
                    <TouchableOpacity style={estilo.botao} onPress={() => { this.props.atualizar(this.props.evento) }}>
                        <Text style={{ color: 'white' }}> <Ionicons name="checkmark-circle" size={17} color="white" />CONCLUIR </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.botao1} onPress={() => { this.props.atrasar(this.props.evento) }}>
                        <Text> <Ionicons name="time" size={17} color="white" />ADIAR </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.botao2} onPress={ () => {this.props.deletar(this.props.id)}}>
                  <Text style={{color: 'white'}}> <Ionicons name="ios-remove-circle-outline" size={17} color="white"/>EXCLUIR </Text>
                  </TouchableOpacity>

                </View>
            </ScrollView>
            

        )
    }
}

const estilo = StyleSheet.create({

    botao: {
        width: 100,
        backgroundColor: '#1fdb8a',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 55,
        padding: 4,
        margin: 4,
        color: 'white'
    },

    botao1: {
        width: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 55,
        padding: 4,
        margin: 4,
        color: 'white'
    },

    botao2: {
        width: 100,
        backgroundColor: '#db021c',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 55,
        padding: 4,
        margin: 4,
        color: 'white'
    },
    areaBotao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        row: 100,
        padding: 3,
        margin: 3,
        borderRadius: 10,
    },

    box: {
        borderBottomColor: 'black',
        borderBottomWidth: 5,
        padding: 5,
        margin: 5,
        borderRadius: 10,
    
      }
})