const router = require('express').Router();
const db = require('../bd');

router.get('/:idusuario', (req, res) => {

    const idusuario = req.params.idusuario;
    const query = "SELECT * FROM USUARIOMATERIA WHERE IDUSUARIO=$1"

    const values=[idusuario];

    db.query(query, values, (err, data) => {
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

router.get('/:idusuario', (req, res) => {

    const idusuario = req.params.idusuario;
    const query = "SELECT * FROM USUARIOMATERIA WHERE IDUSUARIO=$1"

    const values=[idusuario];

    db.query(query, values, (err, data) => {
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

router.post('/cadastrarmateria', (req, res) => {

    const idusuario = req.body.idusuario;
    const idmateria = req.body.idmateria;

    const query = 'INSERT INTO USUARIOMATERIA(idusuariomateria ,idusuario, idmateria) VALUES (DEFAULT, $1, $2)';
    const values = [idusuario, idmateria];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }
        res.status(200).send("Materia cadastrada com sucesso.");
    });
});

router.delete('/descadastrar/:idmateria/:idusuario', (req, res) => {

    const idmateria = req.params.idmateria;
    const idusuario = req.params.idusuario;


    const query = "DELETE FROM USUARIOMATERIA WHERE IDMATERIA=$1 AND IDUSUARIO = $2"
    const query2 = "DELETE FROM DESEMPENHO WHERE IDMATERIA=$1 AND IDUSUARIO = $2";

    const values=[idmateria, idusuario];

    db.query(query2, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send('Bad Request');
            return;
        }

        res.status(200);
    })
    
    db.query(query, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send('Bad Request');
            return;
        }
    
        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }
    
        res.status(200);
    })


})

module.exports = router;