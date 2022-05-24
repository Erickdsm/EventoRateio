import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import EventoDatabase from '../Database/EventoDatabase';
import Evento from '../Models/Evento';
import {TextInputMask} from 'react-native-masked-text';


export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeEvento: '',
      dataDia: '',
      hora: '',
      lugar: '',
      participantes: '',
      valorFinal: '',
      valorPessoa: '',
      statusAtual: '',
    };

    this.Listar();
  }

  Listar = () => {
    const banco = new EventoDatabase();
    banco.Listar().then(eventoCompleta => {
      this.setState({lista: eventoCompleta});
    });
  };

  Cadastrar = (
    nomeEvento,
    dataDia,
    hora,
    lugar,
    participantes,
    valorFinal,
    valorPessoa,
    statusAtual,
  ) => {
    const eventoNovo = new Evento(
      nomeEvento,
      dataDia,
      hora,
      lugar,
      participantes,
      valorFinal,
      valorPessoa,
      statusAtual,
    );
    const banco = new EventoDatabase();
    banco.Inserir(eventoNovo);
    this.Limpar();
  };

  onSalvar = () => {
    this.Cadastrar(
      this.state.nomeEvento,
      this.state.dataDia,
      this.state.hora,
      this.state.lugar,
      this.state.participantes,
      this.state.valorFinal,
      this.statusAtual,
    );
  };

  Limpar = () => {
    this.setState({nomeEvento: ''});
    this.setState({dataDia: ''});
    this.setState({hora: ''});
    this.setState({lugar: ''});
    this.setState({participantes: ''});
    this.setState({valorFinal: ''});
  };

  
    validaHora = valorDigitado => {
    if (valorDigitado.length < 5) {
      return;
    }

    const horario = valorDigitado.split(':');
    const isValidHora = horario[0] > 23;
    const isValidMinutos = horario[1] > 59;

    console.log(isValidHora);
    console.log(isValidMinutos);

    if (isValidHora || isValidMinutos) {
      Alert.alert('Erro', 'Informe um horário existente');
      this.setState({hora: ''});
      return;

    } else {
      this.setState({hora: valorDigitado});
      return;
      
  }
  };


  validaDia = valorDigitado => {
    if (valorDigitado.length < 10) {
      return;
    }

    const today = moment().add(-1,'day');
    const americanDate = valorDigitado.replace(/[/]/g, '-').split('-');
    const final = `${americanDate[2]}-${americanDate[1]}-${americanDate[0]}`;
    const isValidDate = today.valueOf() < moment(final).valueOf();

    if (isValidDate) {
      this.setState({dataDia: valorDigitado});
      return;
    }
    Alert.alert('Erro', 'Informe uma data existente');
    this.setState({dataDia: ''});
    return;
  };

  render() {
    return (
      <View>
        <Text style={estilo.enunciado}>Cadastrar Evento:</Text>
        <View style={estilo.box}>
        {/* nomeEvento */}
        <TextInput
          value={this.state.nomeEvento}
          onChangeText={valorDigitado => {
            this.setState({nomeEvento: valorDigitado});
          }}
          placeholder="Nome do Evento"
          style={estilo.entradasDeDados}
        />

        {/* dataDia */}
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={this.state.dataDia}
          onChangeText={valorDigitado => {
            this.validaDia(valorDigitado);
          }}
          placeholder="Data"
          style={estilo.entradasDeDados}
        />

        {/* hora */}
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'HH:mm',
          }}
          value={this.state.hora}
          onChangeText={valorDigitado => {
            this.validaHora(valorDigitado);
          }}
          placeholder="Hora"
          style={estilo.entradasDeDados}
        />
        <TextInput
          value={this.state.lugar}
          onChangeText={valorDigitado => {
            this.setState({lugar: valorDigitado});
          }}
          placeholder="Onde:"
          style={estilo.entradasDeDados}
        />

        {/* participantes*/}
        <TextInputMask
          type={'only-numbers'}
          value={this.state.participantes}
          onChangeText={valorDigitado => {
            this.setState({
              participantes: valorDigitado,
            });
          }}
          placeholder="Número de participantes"
          style={estilo.entradasDeDados}
        />

        {/* valorFinal*/}
        <TextInputMask
          type={'money'}
          value={this.state.valorFinal}
          onChangeText={valorDigitado => {
            this.setState({
              valorFinal: valorDigitado,
            });
          }}
          placeholder="R$00,00"
          style={estilo.entradasDeDados}
        />
        </View>
        {/* valorPessoa*/}
        {/* <TextInputMask
                    type={'money'}
                    value={this.state.valorFinal}
                    onChangeText={() => {
                      this.setState({valorPessoa: this.props.valorFinal / this.propsparticipantes })
                      console.log(this.valorPessoa.getElement())
                        console.log(this.valorFinal.isValid())
                        console.log(this.valorPessoa.getRawValue())
                    }}
                  />  */}
        <View style={estilo.areaBotao}>
          <TouchableOpacity
            onPress={() =>
              this.Limpar(
                this.state.nomeEvento,
                this.state.dataDia,
                this.state.hora,
                this.state.lugar,
                this.state.participantes,
                this.state.valorFinal,
                this.statusAtual,
              )
            }>
            <Text style={estilo.botao2}> Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // disabled
            onPress={() =>
              this.Cadastrar(
                this.state.nomeEvento,
                this.state.dataDia,
                this.state.hora,
                this.state.lugar,
                this.state.participantes,
                this.state.valorFinal,
                this.statusAtual,
              )
            }>
            <Text style={estilo.botao1}> Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    backgroundColor: '#0e80cc',
    fontWeight: 'bold',
  },

  botao1: {
    width: 100,
    backgroundColor: '#0e80cc',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 55,
    padding: 10,
    margin: 10,
    width: 150,
    height: 40,
    color: 'white',
  },

  botao2: {
    width: 100,
    backgroundColor: '#db021c',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 55,
    padding: 10,
    margin: 10,
    width: 150,
    height: 40,
    color: 'white',
  },

  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: 3,
    margin: 5,
    borderRadius: 10,
  }
});
