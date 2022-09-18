const bd = require('../bd');

// cadastrar novo usuario
async function cadastrar (user) {

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

async function login(emailUsuario){
    const db = await bd.getConexao();
    if(db == null)
        return null;

    try{
        const sql = `SELECT * FROM usuario WHERE emailUsuario='${emailUsuario}'`;
        console.log(sql);
        const res = await db.query(sql);

        const user = res.rows[0];
        return user;
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {cadastrar, login};