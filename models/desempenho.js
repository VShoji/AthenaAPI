class Desempenho {
    #iddesempenho
    #nota
    #idusuario
    #idmateria
    #data

    constructor(iddesempenho, nota, idusuario, idmateria, data) {
        this.iddesempenho = iddesempenho;
        this.nota = nota;
        this.idusuario = idusuario;
        this.idmateria = idmateria;
        this.data = data;
    }


    get iddesempenho() {
        return this.#iddesempenho
    }

    get nota() {
        return this.#nota
    }

    get idusuario() {
        return this.#idusuario
    }

    get idmateria() {
        return this.#idmateria
    }

    get data() {
        return this.#data
    }

    set iddesempenho(iddesempenho) {
        if (iddesempenho === undefined || typeof iddesempenho !== 'number' || isNaN(iddesempenho) || iddesempenho < 0)
            throw ('iddesempenho inválida');

        this.#iddesempenho = iddesempenho;
    }

    set nota(nota) {
        if (nota === undefined || typeof nota !== 'number' || isNaN(nota) || nota < 0)
            throw ('Nota inválida');

        this.#nota = nota;
    }

    set idusuario(idusuario) {
        if (idusuario === undefined || typeof idusuario !== 'number' || isNaN(idusuario) || idusuario < 0)
            throw ('idusuario inválida');

        this.#idusuario = idusuario;
    }

    set idmateria(idmateria) {
        if (idmateria === undefined || typeof idmateria !== 'number' || isNaN(idmateria) || idmateria < 0)
            throw ('idmateria inválida');

        this.#idmateria = idmateria;
    }

    set data(data) {
        if (data===undefined || typeof data !== 'string' || data==="")
            throw ('Data inválida.');

        this.#data = data;
    }

}

function novo(iddesempenho, nota, idusuario, idmateria, data) {
    return new Desempenho(iddesempenho, nota, idusuario, idmateria, data);
}

module.exports = { novo }
