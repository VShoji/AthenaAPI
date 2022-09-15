const router = require('express').Router();
const userController = require('../controllers/usuarioController');

// registrar novo usuario
router.post('/cadastro', userController.cadastrar);

// login
router.post('/login', userController.login);

module.exports = router;