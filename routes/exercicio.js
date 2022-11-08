const router = require('express').Router()
const db = require('../bd.js');

router.get('/conteudo/:id', (req, res) => {
    const query = 'SELECT e.idexercicio as idexercicio, e.tituloexercicio FROM EXERCICIO e, CONTEUDOEXERCICIO ce WHERE e.idexercicio = ce.idexercicio AND ce.idconteudo = $1'
    const values = [req.params.id]

    db.query(query, values, (err, data) => {
        res.send(data.rows);
    })
})
