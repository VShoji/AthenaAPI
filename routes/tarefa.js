const router = require('express').Router();
const db = require('../bd');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM TAREFA';

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

router.get('/getAll/:idusuario', (req, res) => {

    const idusuario = req.params.idusuario;

    const query = 'SELECT * FROM TAREFA WHERE idusuario=$1';

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

router.get('/getUm/:idtarefa', (req, res) => {

    const idtarefa = req.params.idtarefa;

    const query = 'SELECT descricaotarefa FROM tarefa WHERE idtarefa=$1';
    const values = [idtarefa]

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

    const descricaotarefa = req.body.descricaotarefa;
    const idusuario = req.body.idusuariotarefa;
    const date = req.body.date; 
    

    const query = 'INSERT INTO TAREFA(idtarefa ,descricaotarefa, idusuario, date) VALUES (DEFAULT, $1, $2, $3)';
    const values = [descricaotarefa, idusuario, date];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }
        res.status(200).json({message:"Tarefa cadastrada com sucesso.", status: 200});
    });
});

router.put('/put', (req, res) => {

    const idtarefa = req.body.idtarefa;
    const descricaotarefa = req.body.descricaotarefa;

    const query = 'UPDATE TAREFA SET descricaotarefa=$1 where idtarefa=$2';
    const values = [descricaotarefa, idtarefa];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }

        res.status(200).send("Tarefa alterada com sucesso.");
    });
});

router.delete('/delete/:idtarefa', (req, res) => {

    const idtarefa = req.params.idtarefa;

    const query = 'DELETE FROM TAREFA WHERE idtarefa=$1';
    const values = [idtarefa];

    db.query(query, values, (err, data) => {
        if (err) {
            res.status(400).send('Bad Request');
            return;
        }


        res.status(200).send("Tarefa excluida com sucesso.");
    });
})

module.exports = router;