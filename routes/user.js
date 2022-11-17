const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../bd.js');
const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');

// Cadastro

router.post('/atualizarinfo/:idusuario', (req, res) => {

    const idUsuario    = req.params.idusuario;
    const nomeUsuario  = req.body.nomeUsuario;
    const emailUsuario = req.body.emailUsuario;
    const senhaUsuario = req.body.senhaUsuario;

    bcrypt.hash(senhausuario, 10, (err, hash) => {
        if (err) {
            console.log("> " + err)
            res.status(500).send('Internal Server Error');
            return;
        }

        const query = "UPDATE USUARIO SET nomeusuario = '$2', emailusuario = '$3', senhausuario = '$4' where idusuario = $1 ";
        const values = [idUsuario, nomeUsuario, emailUsuario, senhaUsuario];
    
        /*bcrypt.compare(req.body.senhaUsuario, data.rows[0].senhausuario, (err, same) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }

            if (!same) {
                res.status(403).send("Access denied");
                return;
            }*/


        db.query(query, values, (err, data) => {
            if (err) {
                console.log("> " + err)
                res.status(500).send('Internal Server Error');
                return;
            }
        
        })
    });
})


module.exports = router;