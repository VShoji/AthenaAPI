const router = require('express').Router();
const db = require('../bd')

router.get('/', (req, res) => {
    const query = "SELECT * FROM MATERIA"

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

router.get('/getById/:id', (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM MATERIA WHERE idMateria=$1";
    const values = [id];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Bad Request");
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).send(data.rows);
    })
})

router.get('/getMateriasNaoCadastradas/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    const query = "SELECT * FROM MATERIA WHERE idMateria NOT IN (SELECT idMateria FROM USUARIOMATERIA where idUsuario = $1)";
    const values = [idusuario];

    db.query(query, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Bad Request");
            return;
        }

        if (data.rows.length == 0) {
            res.status(404).send('Not Found');
            return;
        }

        res.status(200).send(data.rows);
    })
})



module.exports = router;