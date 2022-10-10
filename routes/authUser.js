const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../bd.js');
const UsuarioController = require('../controllers/usuarioController');
const router = require('express').Router();

// Cadastro

router.post('/cadastro', (req, res) => {
    bcrypt.hash(req.body.senhaUsuario, 10, (err, hashPassword) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const query = "INSERT INTO USUARIO(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) VALUES (DEFAULT, '$1', '$2', '$3')";
        const values = [req.body.nomeUsuario, req.body.emailUsuario, hashPassword];
    
        db.query(query, values, (err, data) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
    
            res.status(200).send(data);
        })
    });
})

// login

router.post('/login', (req, res) => {

/*
    let user;
    user = await UsuarioController.getUserByEmail(req.body.emailUsuario);

    if (user == undefined) {
        return res.status(404).send("Not found");
    }

    try {
        const match =  bcrypt.compare(req.body.senhaUsuario, user.senhausuario);
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
*/
})

module.exports = router;
