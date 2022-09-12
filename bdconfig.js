
module.exports = {

  host: process.env.NODE_POSTGRESQL_SERVIDOR,

  user: process.env.NODE_POSTGRESQL_USUARIO,
  
  password: process.env.NODE_POSTGRESQL_SENHA,

  database: process.env.NODE_POSTGRESQL_DATABASE,

  port: Number(process.env.NODE_POSTGRESQL_PORTA),

  ssl: true
};
