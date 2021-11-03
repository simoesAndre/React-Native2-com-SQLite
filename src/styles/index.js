import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('window').width

const cadastro = StyleSheet.create({
  background: {
    width: width,
    flex: 2,
    backgroundColor: '#FAFAD2'
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    top: 5
  },
  formulario1: {
    backgroundColor: '#FFDAB9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    fontSize: 15,
    height: 37
  },
  formulario2: {
    backgroundColor: '#FFDAB9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    fontSize: 15,
    height: 37,
    bottom: 15
  },
  formulario3: {
    backgroundColor: '#FFDAB9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    fontSize: 15,
    height: 37,
    bottom: 10
  },
  formulario4: {
    backgroundColor: '#FFDAB9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    fontSize: 15,
    height: 37,
    bottom: 5
  },
  areaBotao: {
    alignItems: 'center'
  },
  botao: {
    backgroundColor: '#48D1CC',
    width: 250,
    height: 40,
    justifyContent: 'center'
  },
  textoBotao: {
    fontSize: 18,
    textAlign: 'center'
  }
})

const listagem = StyleSheet.create({
  titulo: {
    fontSize: 20,
    textAlign: 'center',
    top: 5
  },
  item: {
    top: 10
  },
  areaBotao: {
    alignItems: 'center'
  },
  botao: {
    backgroundColor: '#00FA9A',
    width: 150,
    height: 30,
    justifyContent: 'center'
  },
  textoBotao: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textoSituacao: {
    top: 7
  },
  corSituacao1: {
    color: 'blue'
  },
  corSituacao2: {
    color: 'red'
  }
})

export { cadastro, listagem }
