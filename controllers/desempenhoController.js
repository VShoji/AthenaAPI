const bd = require('../bd');


async function getAllNotas(idusuario, idmateria){
    const db = await bd.getConexao();
    if(db == null)
        return null;

    try{
        const sql = `SELECT nota FROM DESEMPENHO WHERE idusuario='${idusuario}'
                                                 AND   idmateria='${idmateria}'`;
        const res = await db.query(sql);
        const notas = res.rows[0];
        return notas;
    }
    catch(e){
        console.log(e);
    }
}

async function getUmaNota(iddesempenho){
    const db = await bd.getConexao();
    if(db == null)
        return null;

    try{
        const sql = `SELECT nota FROM DESEMPENHO WHERE iddesempenho='${iddesempenho}'`;
        const res = await db.query(sql);
        const notas = res.rows;
        return notas;
    }
    catch(e){
        console.log(e);
    }
}
// cadastrar novo usuario
async function inserirNota (nota, idusuario, idmateria) {

    const db = await bd.getConexao();
    if(db == null)
        return null;


    // cadastrar usuario no bd
    try{
        const sql = `INSERT INTO DESEMPENHO(iddesempenho, nota, idusuario, idmateria) VALUES (DEFAULT, '${nota}', '${idusuario}', '${idmateria}')`;
        await db.query(sql);
        return true;

    }
    catch(err){
        return false;
    }
};

// cadastrar novo usuario
async function atualizarNota (iddesempenho, nota) {

    const db = await bd.getConexao();
    if(db == null)
        return null;


    // cadastrar usuario no bd
    try{
        const sql = `UPDATE DESEMPENHO SET nota='${nota}' where iddesempenho'${iddesempenho}'`;
        await db.query(sql);
        return true;

    }
    catch(err){
        return false;
    }
};

async function excluirNota (iddesempenho)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = `DELETE FROM DESEMPENHO WHERE iddesempenho=${iddesempenho}`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {getAllNotas, getUmaNota, inserirNota, atualizarNota, excluirNota};