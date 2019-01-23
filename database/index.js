const mongoose = require('mongoose');

/*
mongoose.connect('mongodb://localhost/rafael',{ useNewUrlParser:true});
mongoose.Promise = global.Promise;


mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');
}); 

module.exports = mongoose;
*/
const { host, databse } = require('../config/config').database;

const url = `mongodb://${host}/${databse}`;
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true }).then(() =>{
    console.log('Database connection successful');
}).catch((err) =>{
    console.log('Error connecting database');
    console.error(`Erro: ${err.message}`);
});

