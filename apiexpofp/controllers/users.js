const bcrypt = require('bcrypt-nodejs');
const service = require('../services');
const User = require('../models/user');

// POST Nuevo usuario
module.exports.registroUsuario = (req, res) => {

    let usuario = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        direccion: req.body.direccion
    });

    usuario.save((err, result) => {
        if(err)
            return res.status(500).jsonp({error: 500, mensaje: `${err.mensaje}`});


        return res.status(201).jsonp({
            token: service.createToken(user),
            email: result.email,
            nombre: result.nombre
        });
    });

};