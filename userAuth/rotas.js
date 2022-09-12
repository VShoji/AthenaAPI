const Usuarios     = require ('./usuarios.js');
const Usuario      = require ('../models/usuario.js');
const Comunicado = require ('./comunicado.js');
const bcrypt = require('bcrypt');

async function cadastro (req, res)
{

    hashSenha = await bcrypt.hash(req.body.senhaUsuario, salt);

    console.log(req.body);

    if (Object.values(req.body).length!=4 || !req.body.idUsuario || !req.body.nomeUsuario || !req.body.senhaUsuario || !req.body.emailUsuario)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de um usuario (ra, nome, cep, complemento e número de residência.)').object;
        return res.status(422).json(erro);
    }
    
    let usuario;
    try
    {
        usuario = Usuario.novo (req.body.idUsuario,
                                req.body.nomeUsuario,
                                hashSenha,
                                req.body.emailUsuario);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Digite os dados corretos para criar uma conta.').object;
        return res.status(422).json(erro);
    }

    const ret = await Usuarios.inclua(usuario);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('UJE','Usuario já existe','Já há usuario cadastrado com o id informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','O usuario foi cadastrado com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}




async function login (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const email = req.params.emailUsuario;
    const senha = req.params.senhaUsuario;
    
    const senhaValida = await bcrypt.ve

    const ret = await Usuarios.recupereUm(email);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret==undefined)
    {
        const erro = Comunicado.novo('UNE','Usuario inexistente','Não há usuario cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}



module.exports = {inclusao, recuperacaoDeUm}