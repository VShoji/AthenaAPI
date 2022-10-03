const router = require('express').Router();
const controller = require('../controllers/desempenhoController');
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

    const query = `SELECT nota FROM DESEMPENHO WHERE iddesempenho=${iddesempenho}`;

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
});

router.post('/post', (req, res) => {

    console.log(req.body);

    let desempenho;
    try {
        desempenho = Desempenho.novo(req.body.iddesempenho, req.body.nota, req.body.idusuario, idmateria);
    }
    catch (excecao) {
        return res.status(422).send("Unprocessable Entity");
    }


    const query = `INSERT INTO DESEMPENHO(iddesempenho, nota, idusuario, idmateria) VALUES (DEFAULT, '${desempenho.nota}', '${desempenho.idusuario}', '${desempenho.idmateria}')`;

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
});

router.put('/put', (req, res) => {
    const ret = controller.atualizarDesempenho(req.body.iddesempenho, req.body.nota);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
});

router.delete('/delete', (req, res) => {

    const iddesemepnho = req.params.iddesemepnho;

    const query = 'DELETE FROM DESEMPENHO WHERE iddesempenho=$1';
    const values = [iddesemepnho];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found')
            return;
        }

        res.status(200);
    });
})

module.exports = router;

