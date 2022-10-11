const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../bd.js');
const UsuarioController = require('../controllers/usuarioController');
const router = require('express').Router();

// Cadastro

router.post('/cadastro', (req, res) => {
    bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const query = "INSERT INTO USUARIO(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) VALUES (DEFAULT, $1, $2, $3)";
        const values = [req.body.nomeUsuario, req.body.emailUsuario, hash];
    
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
    const query = "SELECT * FROM Usuario WHERE emailUsuario = $1";
    const values = [req.body.emailUsuario];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        if (data.rowCount == 0){
            res.status(404).send('Not Found');
            return;
        }

        bcrypt.compare(req.body.senhaUsuario, data.rows[0].senhaUsuario, (err, same) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

            if (!same) {
                res.status(403).send("Access denied");
            }

            const tok = jwt.sign(JSON.stringify(data[0], process.env.TOKEN_SECRET));
            res.status(200).send(tok);
        })
    })
})

module.exports = router;
