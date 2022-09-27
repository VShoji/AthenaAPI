require('dotenv').config()
const {Client}    = require("pg");

async function getConexao ()
{
    const client = new Client({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.port,
        ssl:{
            rejectUnauthorized: false
        }
    });

    try
    {
        client.connect();
        return client;
    }
    catch (erro)
    {
        console.log("> Error while trying to connect: " + erro);
        return null;
    }
}

module.exports = {getConexao}
