const bd = require('../bd');

// cadastrar novo usuario
async function cadastrar (user) {

    console.log(user);

    const db = await bd.getConexao();
    if(db == null)
        return null;


    // cadastrar usuario no bd
    try{
        const sql = `INSERT INTO USUARIO(idUsuario, nomeUsuario, emailUsuario, senhaUsuario) VALUES (DEFAULT, '${user.nomeUsuario}', '${user.emailUsuario}', '${user.senhaUsuario}')`;

        console.log(sql);
        await db.query(sql);
        return true;

    }
    catch(err){
        return false;
    }
};

module.exports = {cadastrar};