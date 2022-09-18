class Usuario
{
    #idUsuario
    #nomeUsuario
    #emailUsuario
    #senhaUsuario
    
    constructor (idUsuario, nomeUsuario, emailUsuario, senhaUsuario)
    {
        this.idUsuario        = idUsuario;
        this.nomeUsuario      =nomeUsuario;
        this.emailUsuario     = emailUsuario;
        this.senhaUsuario     = senhaUsuario;
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

    set idUsuario (idUsuario)
    {
        if (idUsuario===undefined || typeof idUsuario !== 'string' || idUsuario==="")
            throw ('idUsuario inválida');

        this.#idUsuario = idUsuario;
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

function novo (idUsuario, nomeUsuario, emailUsuario, senhaUsuario)
{
    return new Usuario (idUsuario, nomeUsuario, emailUsuario, senhaUsuario);
}

module.exports = {novo}
