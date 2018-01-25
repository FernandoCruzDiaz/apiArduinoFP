const express = require('express');
const consumeController = require('../controllers/consume');
let router = express.Router();

router.post('/', consumeController.nuevoDato);

module.exports = router;