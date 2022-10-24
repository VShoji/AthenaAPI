const router = require('express').Router();
const db = require('../bd');

router.get('/', (req, res) => {
    const query = "SELECT * FROM EXERCICIO"

    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send('Bad Request');
            return;
        }
    
        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }
    
        res.status(200).send(data.rows);
    })
})

router.get('/:idmateria', (req, res) => {
    const idmateria = req.params.idmateria;
    const query = `SELECT * FROM EXERCICIO where idmateria = ${idmateria}`

    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send('Bad Request');
            return;
        }
    
        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }
    
        res.status(200).send(data.rows);
    })
})

module.exports = router;