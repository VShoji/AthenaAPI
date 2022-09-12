const bd = require ('./bd');

async function inclua (aluno)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = `INSERT INTO ALUNO (ra,nome,cep,complemento,numeroResidencia) VALUES (${aluno.ra}, '${aluno.nome}', ${aluno.cep}, '${aluno.complemento}', ${aluno.numeroResidencia})`;
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
        const sql   = `UPDATE ALUNO SET nome='${aluno.nome}',cep=${aluno.cep},complemento='${aluno.complemento}',NUMERORESIDENCIA='${aluno.numeroResidencia}' WHERE ra=${aluno.ra}`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}
    
async function remova (ra)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = `DELETE FROM ALUNO WHERE ra=${ra}`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function getAlunoCep(ra){

    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = `SELECT cep FROM ALUNO WHERE ra=${ra}`;
        const res = await conexao.query(sql);
        const cep = res.rows[0].cep;

        return cep;
    }
    catch (excecao)
    {
        return false;
    }

}


async function recupereUm (ra)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = `SELECT * FROM ALUNO WHERE ra=${ra}`;
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



