const bcrypt = require('bcrypt-nodejs');
const service = require('../services');
const User = require('../models/user');

// POST Nuevo usuario
module.exports.registroUsuario = (req, res) => {

    let user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        direccion: req.body.direccion
    });

    user.save((err, result) => {
        if (err)
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });

        return res.status(201).jsonp({
            token: service.createToken(user),
            email: result.email,
            nombre: result.nombre
        });

    });

};

// POST login
module.exports.signIn = (req, res) => {

    User
        .findOne({email: req.body.email})
        .select('_id email +password ')
        .exec((err, user) => {

            if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
            if (!user) return res.status(404).jsonp({error: 404, mensaje: 'No existe el usuario'});

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                if (result == false)
                    return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                else {
                    //TODO Posiblemente la tengamos que revisar
                    req.user = user;
                    res.status(200).jsonp({
                        mensaje: 'Login correcto',
                        token: service.createToken(user)
                    });
                }
            });

        });

};