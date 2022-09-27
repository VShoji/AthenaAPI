const MateriaController = require('../controllers/materiaController');

router = require('express').Router();
materiaController = new MateriaController()

router.get('/', (req, res) => {
    data = materiaController.getAll();
    if (!data) {
        res.status(400).send('Internal Server Error');
        return;
    }

    if (data.rows.length == 0) {
        res.status(404).send('Not Found')
        return;
    }

    res.status(200).send(data.json());
})

module.exports = router;