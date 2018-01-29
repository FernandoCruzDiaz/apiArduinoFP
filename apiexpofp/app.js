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
    { useMongoClient: true });

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

