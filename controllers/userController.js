const { user } = require("pg/lib/defaults");

// registrar novo usuario
exports.register = async (req, res) => {

    //hash da senha
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

    // criar um objeto usuario
    const user = new user({
        idUsuario : req.body.idUsuario,
        nomeUsuario : req.body.nomeUsuario,
        emailUsuario : req.body.emailUsuario,
        senhaUsuario : hasPassword

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