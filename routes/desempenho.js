const router = require('express').Router();
const controller = require('../controllers/desempenhoController');
const Desempenho = require('../models/desempenho');

router.get('/:idusuario/:idmateria', (req, res) => {
    
    const ret = await controller.getAllNotas(req.body.idusuario, req.body.idmateria);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
});

router.get('/:iddesempenho', (req, res) => {
    
    const ret = await controller.getUmaNota(req.body.iddesempenho);

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

    const ret = await controller.inserirDesempenho(desempenho);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
});

router.put('/put', (req, res) => {
    const ret = await controller.atualizarDesempenho(req.body.iddesempenho, req.body.nota);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
});

router.delete('/delete', (req, res) => {
    const ret = await controller.excluirDesempenho(req.body.iddesempenho);

    if (ret == null) {
        return res.status(500).send("Internal Server Error");
    }
    if (ret == false) {
        return res.status(409).send("Conflict");
    }

    return ret;
})

module.exports = router;

