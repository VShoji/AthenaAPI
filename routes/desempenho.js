const router = require('express').Router();
const controller = require('../controllers/desempenhoController');
const Desempenho = require('../models/desempenho');
const db = require('../bd');

router.get('/getAll/:idusuario/:idmateria', (req, res) => {

    if (db == null)
        return null;


    const idusuario = req.params.idusuario;
    const idmateria = req.params.idmateria;
    console.log(idusuario);
    console.log(idmateria);


    const query = `SELECT nota FROM DESEMPENHO WHERE idusuario='${idusuario}'
                   AND   idmateria='${idmateria}'`;

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

router.get('/getUm/:iddesempenho', (req, res) => {

    const ret = controller.getUmaNota(req.body.iddesempenho);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
});

router.post('/post', (req, res) => {

    let desempenho;
    try {
        desempenho = Desempenho.novo(req.body.iddesempenho, req.body.nota, req.body.idusuario, idmateria);
    }
    catch (excecao) {
        return res.status(422).send("Unprocessable Entity");
    }

    const ret = controller.inserirDesempenho(desempenho);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
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
    const ret = controller.excluirDesempenho(req.body.iddesempenho);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
})

module.exports = router;

