const Consumo = require('./models/consume');

// POST Nuevo dato de consumo
module.exports.nuevoDato = (req, res) => {

    let dato = new Consumo({
        id_placa: req.body.id_placa,
        consumo: req.body.consumo
    });

    dato.save((err, result) => {
        if(err)
            return res.status(500).jsonp({error: 500, mensaje: `${err.mensaje}`});

        return res.status(201).jsonp({
            consumo: result.consumo
        });
    });
};