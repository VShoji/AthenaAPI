class Nota
{
    #idNota
    #nota

    constructor (idNota, nota)
    {
        this.idNota = idNota;
        this.nota = nota;
    }


    get idNota ()
    {
        return this.#idNota
    }

    get nota ()
    {
        return this.#nota
    }

    set nota (nota)
    {
        if (nota===undefined || typeof nota !== 'number' || isNaN(nota) || nota<0)
            throw ('Nota inválida');

        this.#nota = nota;
    }

}

function novo (nota)
{
    return new Materia (nota);
}

module.exports = {novo}
