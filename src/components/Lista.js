import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { listagem } from '../styles/index'

export default class Lista extends Component {
  render () {
    return (
      <View>
        <Text style={listagem.item}>
          ID: {this.props.id},
          Descrição: {this.props.descricao},
          Data de término: {this.props.dataTermino},
          Prioridade: {this.props.prioridade}
        </Text>
        {this.props.situacao === 'sim' ? <Text style={listagem.textoSituacao}>Situação: <Text style={listagem.corSituacao1}>concluída</Text></Text> : <Text style={listagem.textoSituacao}>Situação: <Text style={listagem.corSituacao2}>atrasada</Text></Text>}
        <Text />
        <View style={listagem.areaBotao}>
          <TouchableOpacity style={listagem.botao} onPress={() => { this.props.deletar(this.props.id) }}>
            <Text style={listagem.textoBotao}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
