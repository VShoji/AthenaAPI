const user = require('../models/usuario');

// cadastrar novo usuario
async function cadastrar (req, res) {

    //hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

    // criar um objeto usuario
    user = new user({
        idUsuario : req.body.idUsuario,
        nomeUsuario : req.body.nomeUsuario,
        emailUsuario : req.body.emailUsuario,
        senhaUsuario : hashPassword
    });

    // cadastrar usuario no bd
    try{
        const id = await User.create(user);
        user.idUsuario = idUsuario;
        delete user.senhaUsuario;
    }
    catch(err){
        res.status(500).send(err);
    }
};

module.exports = {cadastrar};