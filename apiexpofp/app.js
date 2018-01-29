const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger =  require('morgan'); // Para realizar el logging de la aplicación
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const config = require('./config');
const users = require('./routes/users');
const placas = require('./routes/placa');
const consume = require('./routes/consume');

mongoose.connect(config.MONGODB_URI,
    { useMongoClient: true }).then(() => {

    const Placa = require('./models/placa');
    const Consume = require('./models/consume');
    /*
    Placa.find((err, result) => {
        if (!(result && result.length)) {
            let placa = new Placa({
                user: mongoose.Types.ObjectId('5a6880bccdec7417a421a199'),
                id_placa: '1'});
            placa.save((err, result) => {
                if (err) return console.error(`Error de inserción: ${err.message}`);
                console.log(`Insertado: ${result}`)
            });
        } else{
            console.log('Ya hay Datos');
        }
    });*/

    Consume.find((err, result) => {
        if(!(result && result.length)){
            let consume = new Consume({
               id_placa: mongoose.Types.ObjectId('5a6edba28bdf80231cbee9ac'),
               consumo: 34,
               fecha_Inicio: Date.now(),
               fecha_Fin: Date.now()
            });
            consume.save((err, result) => {
                if (err) return console.error(`Error de inserción: ${err.message}`);
                console.log(`Insertado: ${result}`)
            });
        } else{
            console.log('Ya hay Datos');
        }
    });

}, (err) => {
    console.error(`Error de conexión: ${err.message}`);
});

mongoose.Promise = global.Promise; //para la creacion de peticiones

let app = express();

app.use(logger('dev')); // Para "inicializar" el logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', users);
app.use('/data', consume);
app.use('/placa',  auth.isAuth, placas);

module.exports = app;

