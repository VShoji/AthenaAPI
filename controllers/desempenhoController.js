export default class DesempenhoController {
    constructor(db) {
        this.db = db;
    }

    getDesempenho(req, res) {
        var body = JSON.parse(req.body);
        res.send(body);
    }
}