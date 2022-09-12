const bd = require ('./bd');

async function inclua (aluno)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = `INSERT INTO ALUNO (raaluno,nomealuno,cep,complemento,numeroResidencia) VALUES (${aluno.raaluno}, '${aluno.nomealuno}', ${aluno.cep}, '${aluno.complemento}', ${aluno.numeroResidencia})`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function atualize (aluno)
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

async function getAlunoCep(raaluno){

    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = `SELECT cep FROM ALUNO WHERE raaluno=${raaluno}`;
        const res = await conexao.query(sql);
        const cep = res.rows[0].cep;

        return cep;
    }
    catch (excecao)
    {
        return false;
    }

}


async function recupereUm (raaluno)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = `SELECT * FROM ALUNO WHERE raaluno=${raaluno}`;
        const res = await conexao.query(sql);  
        const linhas = res.rows[0];

        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM ALUNO';
        const res = await conexao.query(sql);
        const linhas = res.rows;

        return linhas;
    }
    catch (excecao)
    {
        
        return false;
    }
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos, getAlunoCep}



