class Usuario
{
    #idUsuario
    #senhaUsuario
    #nomeUsuario
    #emailUsuario

    constructor (idUsuario, senhaUsuario, nomeUsuario, emailUsuario)
    {
        this.idUsuario = idUsuario;
        this.senhaUsuario     = senhaUsuario;
        this.nomeUsuario      =nomeUsuario;
        this.emailUsuario     = emailUsuario;
    }


    get idUsuario ()
    {
        return this.#idUsuario
    }

    get senhaUsuario ()
    {
        return this.#senhaUsuario
    }

    get nomeUsuario ()
    {
        return this.#nomeUsuario
    }


    get emailUsuario ()
    {
        return this.#emailUsuario
    }


    set senhaUsuario (senhaUsuario)
    {
        if (senhaUsuario===undefined || typeof senhaUsuario !== 'string' || senhaUsuario==="")
            throw ('senhaUsuario inválida');

        this.#senhaUsuario = senhaUsuario;
    }

    set nomeUsuario (nomeUsuario)
    {
        if (nomeUsuario===undefined || typeof nomeUsuario !== 'string' || nomeUsuario==="")
            throw ('nomeUsuario inválido');

        this.#nomeUsuario = nomeUsuario;
    }

    set emailUsuario (emailUsuario)
    {
        if (emailUsuario===undefined || typeof emailUsuario !== 'string' || emailUsuario==="")
            throw ('emailUsuario inválido');

        this.#emailUsuario = emailUsuario;
    }

    

}

function novo (idUsuario, senhaUsuario, nomeUsuario, emailUsuario)
{
    return new Usuario (idUsuario, senhaUsuario, nomeUsuario, emailUsuario);
}

module.exports = {novo}
