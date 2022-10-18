const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../bd.js');
const router = require('express').Router();

// Cadastro

router.post('/cadastro', (req, res) => {
    bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const query = "INSERT INTO USUARIO(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) VALUES (DEFAULT, $1, $2, $3) RETURNING *";
        const values = [req.body.nomeUsuario, req.body.emailUsuario, hash];
    
        db.query(query, values, (err, data) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
            
            const user = {
                id: data.rows[0].idusuario,
                username: data.rows[0].nomeusuario,
                email: data.rows[0].emailusuario
            }

            const tok = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
            
            res.status(200).send({
                token: tok,
                user: user
            });

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

        bcrypt.compare(req.body.senhaUsuario, data.rows[0].senhausuario, (err, same) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

            if (!same) {
                res.status(403).send("Access denied");
                return;
            }

            const user = {
                id: data.rows[0].idusuario,
                username: data.rows[0].nomeusuario,
                email: data.rows[0].emailusuario
            }

            const tok = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);

            res.status(200).send({
                token: tok,
                user: user
            });
        })
    })
})

module.exports = router;