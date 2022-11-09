const fs = require('fs')
const router = require('express').Router()
const db = require('../bd.js');

router.get('/conteudo/:id', (req, res) => {
    const query = 'SELECT e.idexercicio as idexercicio, e.tituloexercicio FROM EXERCICIO e, CONTEUDOEXERCICIO ce WHERE e.idexercicio = ce.idexercicio AND ce.idconteudo = $1'
    const values = [req.params.id]

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        if (data.rowCount < 1) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).send(data.rows);
    })
})

// TODO: TEST THIS
router.get('/:id', (req, res) => {
    const query = 'SELECT pathexercicio FROM EXERCICIO WHERE idexercicio = $1'
    const values = [req.params.id]

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        if (data.rowCount < 1) {
            res.status(404).send('Not Found');
            return;
        }

        fs.readFile(data.rows[0].pathexercicio, (err, file) => {
            if (err || !file) {
                res.status(404).send('Not Found');
                return;
            }

            res.status(200).send(file);
        });
    })
})

module.exports = router;