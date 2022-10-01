const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const UsuarioController = require('../controllers/usuarioController');
const router = require('express').Router();

// Cadastro

router.post('/cadastro', (req, res) => {
    if (Object.values(req.body).length != 4 || !req.body.idUsuario || !req.body.nomeUsuario || !req.body.emailUsuario || !req.body.senhaUsuario)
        return res.status(422).json();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

    let user;
    try {
        user = Usuario.novo(req.body.idUsuario, req.body.nomeUsuario, req.body.emailUsuario, hashPassword);
    }
    catch (excecao) {
        return res.status(422).send("Unprocessable Entity");
    }

    const ret = await UsuarioController.inserirUsuario(user);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return res.status(201).send("Sucess");
})

// login

router.post('/login', (req, res) => {

    let user;
    user = await UsuarioController.getUserByEmail(req.body.emailUsuario);

    if (user == undefined) {
        return res.status(404).send("Not found");
    }

    try {
        const match = await bcrypt.compare(req.body.senhaUsuario, user.senhausuario);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
        if (match) {
            res.json({ accessToken: accessToken });

        } else {
            res.json({ message: "Invalid Credentials" });
        }
    }
    catch (e) {
        console.log(e);
    }

})

module.exports = router;
