const bd = require ('./bd');

async function cadastrar (usuario)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = `INSERT INTO usuario (idusuario,nomeusuario,senhausuario,emailusuario) VALUES (default, '${usuario.nomeusuario}', ${usuario.senhausuario}, '${usuario.emailusuario}')`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

/*async function atualize (aluno)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = `UPDATE ALUNO SET nomealuno='${aluno.nomealuno}',cep=${aluno.cep},complemento='${aluno.complemento}',NUMERORESIDENCIA='${aluno.numeroResidencia}' WHERE raaluno=${aluno.raaluno}`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
    
async function remova (raaluno)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = `DELETE FROM ALUNO WHERE raaluno=${raaluno}`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
*/

async function login (emailusuario)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = `SELECT * FROM usuario WHERE emailusuario=${emailusuario}`;
        const res = await conexao.query(sql);  
        const linhas = res.rows[0];

        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {cadastrar, login}



