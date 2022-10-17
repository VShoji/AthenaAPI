class Desempenho
{
    #iddesemepnho
    #nota
    #idUsuario
    #idMateria

    constructor (iddesempenho, nota, idUsuario, idMateria)
    {
        this.iddesemepnho = iddesempenho;
        this.nota = nota;
        this.idUsuario = idUsuario;
        this.idMateria = idMateria;

    }


    get iddesemepnho ()
    {
        return this.#iddesemepnho
    }

    get nota ()
    {
        return this.#nota
    }

    get idUsuario ()
    {
        return this.#idUsuario
    }

    get idMateria ()
    {
        return this.#idMateria
    }

    set nota (nota)
    {
        if (nota===undefined || typeof nota !== 'number' || isNaN(nota) || nota<0)
            throw ('Nota inválida');

        this.#nota = nota;
    }

    set idUsuario (idUsuario)
    {
        if (idUsuario===undefined || typeof idUsuario !== 'string' || idUsuario==="")
            throw ('idUsuario inválida');

        this.#idUsuario = idUsuario;
    }

    set idMateria (idMateria)
    {
        if (idMateria===undefined || typeof idMateria !== 'string' || idMateria==="")
            throw ('idMateria inválida');

        this.#idMateria = idMateria;
    }

}

function novo (nota)
{
    return new Materia (nota);
}

module.exports = {novo}
