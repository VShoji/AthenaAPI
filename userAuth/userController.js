const { user } = require("pg/lib/defaults");
const { cadastrar } = require("./usuarioController");

// registrar novo usuario
async function cadastrar (req, res) {

    console.log(req.body);

    //hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

    // criar um objeto usuario
    const user = new user({
        idUsuario : req.body.idUsuario,
        nomeUsuario : req.body.nomeUsuario,
        emailUsuario : req.body.emailUsuario,
        senhaUsuario : hashPassword
    });

    


}

module.exports = {cadastrar}