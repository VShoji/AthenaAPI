

const usuario = require ('./controllers/usuarioController');
const materia = '/materia'

module.exports = (app, db) => {


    app.get('/', (req, res) => {
        res.send("Bem vindo a API de Áthena.");
    });


    // Cadastro e login
    ////////////////////////////////////////

    app.post('/cadastro', usuario.cadastrar);

    


    //////////////////////////////////////////////

    app.get(materia, (req, res) => {
        const sql = 'SELECT * FROM MATERIA';
        db.query(sql, (err, qres) => {
            if (err)
            {
                res.status(400).send("Bad Request");
                return;
            }

            if (qres.rowCount == 0) {
                res.status(404).send("Not Found");
                return;
            }

            res.status(200).json(qres);
        })
    })
}
