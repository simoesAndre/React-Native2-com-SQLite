import SQLite from 'react-native-sqlite-storage'
SQLite.DEBUG(true)
SQLite.enablePromise(true)

const database_name = 'Tarefa.db'
const database_version = '1.0'
const database_displayname = 'SQLite React Offline Database'
const database_size = 200000

export default class BancoDados {
  conectar () {
    let db
    return new Promise((resolve) => {
      console.log('Checando a integridade do plugin ...')
      SQLite.echoTest().then(() => {
        console.log('Integridade Ok ...')
        console.log('Abrindo Banco de Dados ...')
        SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
          db = DB
          console.log('Banco de dados Aberto')
          db.executeSql('SELECT 1 FROM Tarefa LIMIT 1').then(() => {
            console.log('O banco de dados está pronto ... Executando Consulta SQL ...')
          }).catch((error) => {
            console.log('Erro Recebido: ', error)
            console.log('O Banco de dados não está pronto ... Criando Dados')
            db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(200), dataTermino VARCHAR(30), prioridade VARCHAR(30), situacao VARCHAR(30))')
            }).then(() => {
              console.log('Tabela criada com Sucesso')
            }).catch(error => {
              console.log(error)
            })
          })
          resolve(db)
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        console.log('echoTest Falhou - plugin não funcional')
      })
    })
  }

  desconectar (db) {
    if (db) {
      console.log('Fechando o banco de dados')
      db.close().then(status => {
        console.log('Banco de dados Desconectado!!')
      }).catch(error => {
        this.errorCB(error)
      })
    } else {
      console.log('A conexão com o banco não está aberta')
    }
  }

  adicionar (tarefa) {
    return new Promise((resolve) => {
      this.conectar().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('INSERT INTO Tarefa (descricao, dataTermino, prioridade, situacao) VALUES (?, ?, ?, ?)', [tarefa.descricao, tarefa.dataTermino, tarefa.prioridade, tarefa.situacao]).then(([tx, results]) => {
            resolve(results)
          })
        }).then((result) => {
          this.desconectar(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  listar () {
    return new Promise((resolve) => {
      const tarefas = []
      this.conectar().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Tarefa', []).then(([tx, results]) => {
            console.log('Consulta completa')
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i)
              console.log(`ID: ${row.id}, Descrição: ${row.descricao}, Data de término: ${row.dataTermino}, Prioridade: ${row.prioridade}, Situação: ${row.situacao}`)
              const { id, descricao, dataTermino, prioridade, situacao } = row
              tarefas.push({ id, descricao, dataTermino, prioridade, situacao })
            }
            console.log(tarefas)
            resolve(tarefas)
          })
        }).then((result) => {
          this.desconectar(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  buscarPorId (id) {
    console.log(id)
    return new Promise((resolve) => {
      this.conectar().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Tarefa WHERE id = ?', [id]).then(([tx, results]) => {
            console.log(results)
            if (results.rows.length > 0) {
              let row = results.rows.item(0)
              resolve(row)
            }
          })
        }).then((result) => {
          this.desconectar(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  deletar (id) {
    return new Promise((resolve) => {
      this.conectar().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Tarefa WHERE id = ?', [id]).then(([tx, results]) => {
            console.log(results)
            resolve(results)
          })
        }).then((result) => {
          this.desconectar(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }
};
