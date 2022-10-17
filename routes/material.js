const router = require('express').Router();
const db = require('../bd.js');

// Obtém o material pelo id
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM Material WHERE idMaterial=$1';
    const values = [req.params.id];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rowCount == 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).send(data.rows[0]);
    })
})

// Obtém todo o material de um assunto
router.get('/conteudo/:id', (req, res) => {
    const query = 'SELECT * FROM ConteudoMaterial WHERE idConteudo=$1';
    const values = [req.params.id];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log("> " + err);
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rowCount == 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).send(data.rows);
    })
})

module.exports = router;