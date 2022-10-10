class Materia
{
    #idMateria
    #nome

    constructor (idMateria, nome)
    {
        this.idMateria = idMateria;
        this.nome = nome;
    }


    get idMateria ()
    {
        return this.#idMateria
    }

    get nome ()
    {
        return this.#nome
    }


    set idMateria (idMateria)
    {
        if (idMateria===undefined || typeof idMateria !== 'string' || idMateria==="")
            throw ('idMateria inválida');

        this.#idMateria = idMateria;
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
