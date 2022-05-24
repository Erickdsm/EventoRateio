import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(false);
SQLite.enablePromise(true);

const database_name = "SQLiteEvento.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "SQLite React Offline Database"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class EventoDatabase {

    //Função de inicialização do Banco de Dados
        Conectar() {  
            let db;
            return new Promise((resolve) => {    
                console.log("Checando a integridade do plugin ...");    
                SQLite.echoTest().then(() => {        
                    console.log("Integridade Ok ...");        
                    console.log("Abrindo Banco de Dados ...");        
                    SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                        db = DB;            
                        console.log("Banco de dados Aberto");            
                        db.executeSql('SELECT 1 FROM Evento LIMIT 1').then(() => {
                            console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                        }).catch((error) =>{
                            console.log("Erro Recebido: ", error);
                            console.log("O Banco de dados não está pronto ... Criando Dados");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS Evento (id INTEGER PRIMARY KEY AUTOINCREMENT, nomeEvento varchar(50), dataDia date, hora time, lugar varchar(50), participantes INTEGER, valorFinal varchar(20), valorPessoa varchar(20), statusAtual)');
                            }).then(() => {
                                console.log("Tabela criada com Sucesso");                
                            }).catch(error => {                    
                                console.log(error);                
                            });            
                        });            
                    resolve(db);          
                }).catch(error => {           
                    console.log(error);          
                });      
            }).catch(error => {        
                console.log("echoTest Falhou - plugin não funcional");      
            });    
        }); 
    };

        //Função para fechar a Conexão com o Banco de dados
        Desconectar(db) {  
        if (db) {    
            console.log("Fechando Banco de Dados");    
            db.close().then(status => {        
                console.log("Banco de dados Desconectado!!");      
            }).catch(error => {        
                this.errorCB(error);      
            });  
        } else {    
            console.log("A conexão com o banco não está aberta");  
        } 
    };

              //Função para listar itens da tabela produtos
            Listar() {  
                return new Promise((resolve) => {    
                const lista = [];    
                    this.Conectar().then((db) => {      
                    db.transaction((tx) => {     
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Evento', []).then(([tx,results]) => {          
                    console.log("Consulta completa");          
                    var len = results.rows.length;          
                    for (let i = 0; i < len; i++) {            
                        let row = results.rows.item(i);                        
                        const {id, nomeEvento, dataDia, hora, lugar, participantes, valorFinal, valorPessoa, statusAtual } = row;
                        lista.push({id, nomeEvento, dataDia, hora, lugar, participantes, valorFinal, valorPessoa, statusAtual});
                    }
                    console.log(lista);          
                    resolve(lista);
                });
            }).then((result) => {
                this.Desconectar(db);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
    }

//Função para buscar os dados de um produto específico pelo id 
      BuscarPorId(id) {  
          console.log(id);  
          return new Promise((resolve) => {    
              this.Conectar().then((db) => {      
                  db.transaction((tx) => {   
                      //Query SQL para buscar as informações do produto     
                      tx.executeSql('SELECT * FROM Evento WHERE id = ?', [id]).then(([tx,results]) => {          
                        console.log(results);         
                        if(results.rows.length > 0) {            
                            let row = results.rows.item(0);            
                            resolve(row);          
                        }        
                    });      
                  }).then((result) => {        
                      this.Desconectar(db);      
                  }).catch((err) => {        
                      console.log(err);      
                  });    
              }).catch((err) => {      
                  console.log(err);    
              });  
          });  
      }

      // Função para acrescentar um novo produto na tabela
      Inserir(evento) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Evento (nomeEvento, dataDia, hora, lugar, participantes, valorFinal, valorPessoa, statusAtual) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [evento.nomeEvento, evento.dataDia, evento.hora, evento.lugar, evento.participantes, evento.valorFinal, evento.valorPessoa, evento.statusAtual]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

        //Função para atualizar um dado que já foi escrito anteriormente no banco de dados a partir da sua id
      Atualizar(id, evento) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Evento SET nomeEvento, dataDia, hora, lugar, participantes, valorFinal, valorPessoa, statusAtual = ? WHERE id = ?', [evento.nomeEvento, evento.dataDia, evento.hora, evento.lugar, evento.participantes, evento.valorFinal, evento.valorPessoa, evento.statusAtual]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }

    Concluir(evento) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Evento SET statusAtual = ? WHERE id = ?', ["Concluído",evento.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }    

    
    Atrasar(evento) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql('UPDATE Evento SET statusAtual = ? WHERE id = ?', ["Adiado",evento.id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }  
    
        //Função para excluir um dado do banco pela id
        Remover(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Evento WHERE Id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }
           
}