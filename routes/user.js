const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../bd.js');
const router = require('express').Router();

// Cadastro

router.post('/atualizarinfo/:idusuario', (req, res) => {

    const idUsuario    = req.params.idusuario;
    const nomeUsuario  = req.body.nomeUsuario;
    const emailUsuario = req.body.emailUsuario;
    const senhaAtual = req.body.senhaAtual;
    const novaSenha = req.body.novaSenha;
 

    const query = "SELECT * FROM USUARIO where idusuario = $1 ";
    values = [idUsuario];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log("> " + err)
            res.status(500).json({message: "Internal Server Error;", status: 500});
            return;
        }

            bcrypt.compare(senhaAtual, data.rows[0].senhausuario, (err, same) => {
                if (err) {
                    console.log("> " + err)
                    res.status(500).json({message: "Internal Server Error;", status: 500});
                    return;
                }

                if (!same) {
                    res.status(403).json({message: "Access denied", status: 403});
                    return;
                }

        });
    })

        bcrypt.hash(novaSenha, 10, (err, hash) => {
            if (err) {
                console.log("> " + err)
                res.status(500).json({message: "Internal Server Error", status: 500});
                return;
            }
            
        

        const query2 = "UPDATE USUARIO SET nomeusuario = '$2', emailusuario = '$3', senhausuario = '$4' where idusuario = $1 ";
        const values = [idUsuario, nomeUsuario, emailUsuario, hash];

        db.query(query2, values, (err) => {
            if (err) {
                console.log("> " + err)
                res.status(500).json({message: "Internal Server Error;", status: 500});
                return;
            }
        
        })

        res.status.json({message: "Sucess", status: 201})
        });
    });


module.exports = router;