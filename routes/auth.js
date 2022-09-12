const router = require('express').Router();
const userController = require('../controllers/user.controller');

// registrar novo usuario
router.post('/register', userController.register);

// login
router.post('/login', userController.login);

module.exports = router;