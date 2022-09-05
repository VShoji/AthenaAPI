class Usuario
{
    #idUsuario
    #senha
    #nome
    #email

    constructor (idUsuario, senha, nome, email)
    {
        this.idUsuario = idUsuario;
        this.senha     = senha;
        this.nome      =nome;
        this.email     = email;
    }


    get idUsuario ()
    {
        return this.#idUsuario
    }

    get senha ()
    {
        return this.#senha
    }

    get nome ()
    {
        return this.#nome
    }


    get email ()
    {
        return this.#email
    }


    set senha (senha)
    {
        if (senha===undefined || typeof senha !== 'string' || senha==="")
            throw ('Senha inválida');

        this.#senha = senha;
    }

    set nome (nome)
    {
        if (nome===undefined || typeof nome !== 'string' || nome==="")
            throw ('Nome inválido');

        this.#nome = nome;
    }

    set email (email)
    {
        if (email===undefined || typeof email !== 'string' || email==="")
            throw ('Email inválido');

        this.#email = email;
    }

    

}

function novo (senha, nome, email)
{
    return new Usuario (senha, nome, email);
}

module.exports = {novo}
