const router = require('express').Router();
const Desempenho = require('../models/desempenho');
const db = require('../bd');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM DESEMPENHO';

    db.query(query, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.rows);
    });
})

router.get('/getAll/:idusuario/:idmateria', (req, res) => {

    const idusuario = req.params.idusuario;
    const idmateria = req.params.idmateria;

    const query = 'SELECT nota FROM DESEMPENHO WHERE idusuario=$1 AND idmateria=$2';

    const values = [idusuario, idmateria];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.rows);
    });
});

router.get('/getUm/:iddesempenho', (req, res) => {

    const iddesempenho = req.params.iddesempenho;

    const query = 'SELECT nota FROM DESEMPENHO WHERE iddesempenho=$1';
    const values = [iddesempenho]

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200).send(data.rows);
    });
});

router.get('/getAllUser/:idusuario', (req, res) => {

    const idusuario = req.params.idusuario;

    const query = 'SELECT * FROM DESEMPENHO WHERE idusuario=$1';
    const values = [idusuario];

    db.query(query, values, (err, data) => {

        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }
        
        res.status(200).send(data.rows);
    });
});

router.post('/post', (req, res) => {

    let ts = Date.now();
    let date_ob = new Date(ts);

    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let dateNow = year + "-" + month + "-" + date;


    let desempenho;
    try {
        desempenho = Desempenho.novo(req.body.iddesempenho, req.body.nota, req.body.idusuario, req.body.idmateria, dateNow);
    }
    catch (excecao) {
        console.log(excecao);
        return res.status(422).send("Unprocessable Entity");
    }

    const nota = desempenho.nota;
    const idusuario = desempenho.idusuario;
    const idmateria = desempenho.idmateria;
    const data      = desempenho.data;


    const query = 'INSERT INTO DESEMPENHO(iddesempenho, nota, idusuario, idmateria, data) VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [nota, idusuario, idmateria, data];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        res.status(200).send("Desempenho cadastrado com sucesso.");
    });
});

router.put('/put', (req, res) => {

    const iddesempenho = req.body.iddesempenho;
    const nota = req.body.nota;

    const query = 'UPDATE DESEMPENHO SET nota=$2 where iddesempenho=$1';
    const values = [iddesempenho, nota];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        res.status(200).send("Desempenho alterado com sucesso.");
    });
});

router.delete('/delete/:iddesempenho', (req, res) => {

    const iddesempenho = req.params.iddesempenho;

    const query = 'DELETE FROM DESEMPENHO WHERE iddesempenho=$1';
    const values = [iddesempenho];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }


        res.status(200).send("Desempenho excluido com sucesso.");
    });
})

module.exports = router;