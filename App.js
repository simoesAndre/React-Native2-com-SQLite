import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, DevSettings, ScrollView } from 'react-native'
import Lista from './src/components/Lista'
import BancoDados from './src/database/BancoDados'
import Tarefa from './src/model/Tarefa'
import { cadastro, listagem } from './src/styles/index'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      descricao: '',
      dataTermino: '',
      prioridade: '',
      situacao: '',
      tarefas: []
    }
    this.listarTarefa()
  }

  cadastrar (descricao, dataTermino, prioridade, situacao) {
    const novaTarefa = new Tarefa(descricao, dataTermino, prioridade, situacao)
    const banco = new BancoDados()
    banco.adicionar(novaTarefa)
    this.listarTarefa()
  }

  listarTarefa () {
    const banco = new BancoDados()
    banco.listar().then(data => { this.setState({ tarefas: data }) })
  }

  deletarTarefa (id) {
    const banco = new BancoDados()
    banco.deletar(id).then(data => { DevSettings.reload() })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={cadastro.background}>
          <Text style={cadastro.titulo}>Cadastro de Tarefas</Text>
          <Text />
          <TextInput style={cadastro.formulario1} onChangeText={(textoDigitado) => { this.setState({ descricao: textoDigitado }) }} placeholder='Descrição:' />
          <Text />
          <TextInput style={cadastro.formulario2} onChangeText={(textoDigitado) => { this.setState({ dataTermino: textoDigitado }) }} placeholder='Data de término:' />
          <TextInput style={cadastro.formulario3} onChangeText={(textoDigitado) => { this.setState({ prioridade: textoDigitado }) }} placeholder='Prioridade (alta, normal, baixa):' />
          <TextInput style={cadastro.formulario4} onChangeText={(textoDigitado) => { this.setState({ situacao: textoDigitado }) }} placeholder='Concluída (sim / não):' />
          <Text />
          <View style={cadastro.areaBotao}>
            <TouchableOpacity style={cadastro.botao} onPress={() => { this.cadastrar(this.state.descricao, this.state.dataTermino, this.state.prioridade, this.state.situacao) }}>
              <Text style={cadastro.textoBotao}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 2, backgroundColor: '#FFEFD5' }}>
          <Text style={listagem.titulo}>Listagem</Text>
          <ScrollView>
            {this.state.tarefas.map(
              tarefa => (<Lista key={tarefa.id} id={tarefa.id} descricao={tarefa.descricao} dataTermino={tarefa.dataTermino} prioridade={tarefa.prioridade} situacao={tarefa.situacao} deletar={this.deletarTarefa} />)
            )}
          </ScrollView>
        </View>
      </View>
    )
  }
}
