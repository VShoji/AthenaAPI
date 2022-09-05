const Alunos     = require ('./alunos.js');
const Aluno      = require ('./aluno.js');
const Comunicado = require ('./comunicado.js');
const Logradouro = require ('./logradouro.js');

// para a rota de CREATE
async function inclusao (req, res)
{

    console.log(req.body);

    if (Object.values(req.body).length!=5 || !req.body.ra || !req.body.nome || !req.body.cep || !req.body.complemento || !req.body.numeroresidencia)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas de um aluno (ra, nome, cep, complemento e número de residência.)').object;
        return res.status(422).json(erro);
    }
    
    const logr = await Logradouro.buscarCep(req.body.cep);

    if(logr == null)
    {
        const erro = Comunicado.novo('CEI','CEP Inválido','CEP fornecido é inválido.').object;
        return res.status(404).json(erro);
    }

    let aluno;
    try
    {
        aluno = Aluno.novo (req.body.ra,req.body.nome,req.body.cep,req.body.complemento,req.body.numeroresidencia);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','RA e CEP devem ser um numero natural positivo, nome e complemento devem ser um texto não vazio.').object;
        return res.status(422).json(erro);
    }

    const ret = await Alunos.inclua(aluno);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('LJE','Aluno já existe','Já há aluno cadastrado com o ra informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','O aluno foi incluído com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=5 || !req.body.ra || !req.body.nome || !req.body.cep || !req.body.complemento || !req.body.numeroresidencia)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas de um aluno (RA atual, novo nome, novo cep, novo complemento e novo numero de residencia.)').object;
        return res.status(422).json(erro);
    }
    
    let aluno;
    try
    {
        aluno = Aluno.novo (req.body.ra, req.body.nome,req.body.cep ,req.body.complemento,req.body.numeroresidencia);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','RA e CEP devem ser um numero natural positivo, nome e complemento devem ser um texto não vazio.').object;
        return res.status(422).json(erro);
    }

    const logr = await Logradouro.buscarCep(req.body.cep);

    if(logr == null)
    {
        const erro = Comunicado.novo('CEI','CEP Inválido','CEP fornecido é inválido.').object;
        return res.status(404).json(erro);
    }

    const ra = req.params.ra;
    
    if (ra!=aluno.ra)
    {
        const erro = Comunicado.novo('TMR','Mudança de RA','Tentativa de mudar o RA do aluno').object;
        return res.status(400).json(erro);    
    }
    
    let ret = await Alunos.recupereUm(ra);
    

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
        const erro = Comunicado.novo('ANE','aluno inexistente','Não há aluno cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Alunos.atualize(aluno);

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

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','O aluno foi atualizado com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de DELETE
async function remocao (req, res)
{
    

    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }
    
    const ra = req.params.ra;
    let ret = await Alunos.recupereUm(ra);

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
        const erro = Comunicado.novo('ANE','aluno inexistente','Não há aluno cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    ret = await Alunos.remova(ra);

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

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','O aluno foi removido com sucesso').object;
        return res.status(200).json(sucesso);
  //}    
}

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ra = req.params.ra;
    const cep = await Alunos.getAlunoCep(ra);

    const logr = await Logradouro.buscarCep(cep);
    
    const ret = await Alunos.recupereUm(ra);

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
        const erro = Comunicado.novo('ANE','Aluno inexistente','Não há aluno cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json([ret, logr.data]);
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ret = await Alunos.recupereTodos();

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

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}