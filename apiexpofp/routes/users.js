const express = require('express');
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');
let router = express.Router();

router.post('/register', userController.registroUsuario);
router.post('/login', userController.signIn);

module.exports = router;
