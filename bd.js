require('dotenv').config()
const {Client}    = require("pg");

const client = new Client({
    connectionString : process.env.HEROKU_DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

client.connect();

async function getConexao ()
{
    if (global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    try
    {
        const conexao = client;
        global.conexao = conexao;

        return conexao;
    }
    catch (erro)
    {
        return null;
    }
}



module.exports = {getConexao}
