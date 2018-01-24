const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumo = new Schema({
    id_placa: {type: String, unique: true},
    consumo: Number
});

module.exports = mongoose.model('Consume', consumo);