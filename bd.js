require('dotenv').config()

const {Client} = require("pg");
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

client.connect(err => {
    if (err)
        console.log('> ' + err)
});

module.exports = client;