module.exports = class MateriaController {
    constructor() {
        this.db = require('../bd.js').getConexao();
    }

    getAll() {
        const query = "SELECT * FROM MATERIA"
        this.db.query(query, (err, res) => {
            if (err) {
                console.log(err);
                return null;
            }

            return res;
        })
    }
}