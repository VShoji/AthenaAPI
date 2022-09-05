class Conteudo
{
    #idConteudo
    #nome

    constructor (idConteudo, nome)
    {
        this.idConteudo = idConteudo;
        this.nome = nome;
    }


    get idConteudo ()
    {
        return this.#idConteudo
    }

    get nome ()
    {
        return this.#nome
    }


    set nome (nome)
    {
        if (nome===undefined || typeof nome !== 'string' || nome==="")
            throw ('Nome inválido');

        this.#nome = nome;
    }


}

function novo (nome)
{
    return new Materia (nome);
}

module.exports = {novo}
