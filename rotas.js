const bcrypt = require('bcrypt');
const Usuario = require ('./models/usuario');
const UsuarioController = require ('./controllers/usuarioController');
const materia = '/materia'

    // Cadastro e login
    ////////////////////////////////////////

    async function cadastrar(req, res){
        if(Object.values(req.body).length != 4 || !req.body.idUsuario || !req.body.nomeUsuario || !req.body.emailUsuario || !req.body.senhaUsuario)
            return res.status(422).json();

            
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.senhaUsuario, salt);
            
            console.log(req.body);
            console.log(hashPassword);

            let user;
            try
            {
                user = Usuario.novo (req.body.idUsuario ,req.body.nomeUsuario,req.body.emailUsuario ,hashPassword);
            }
            catch (excecao)
            {
                return res.status(422).send("Unprocessable Entity");
            }    

        const ret = await UsuarioController.cadastrar(user);

        if(ret==null){
            return res.status(500).send("Internal Server Error");
        }
        if(ret==false){
            return res.status(409).send("Conflict");
        }

        return res.status(201).send("Sucess");
    }
    
module.exports = {cadastrar};
