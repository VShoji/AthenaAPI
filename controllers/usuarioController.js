const express = require("express")
//definar as rotas
const router = express.Router()
//usado para mexer com o banco de dados
const User = require("../models/usuario")
//criptografar a senha
const bcrypt = require("bcryptjs")
//verificação com funcao
const userAuth = require("../midUsuariodlewares/userAuth")

router.get("/users/new", (req, res) => {
    var nomeError = req.flash("nomeError")
    var emailError = req.flash("emailError")
    var passwordError = req.flash("passwordError")
    var createSuccess = req.flash("createSuccess")
    var emailRegistered = req.flash("emailRegistered")

    var nome = req.flash("nome")
    var email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    passwordError = (passwordError == undefined || passwordError.length == 0) ? undefined : passwordError
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError

    nome = (nome == undefined || nome.length == 0) ? "" : nome
    email = (email == undefined || email.length == 0) ? "" : email

    createSuccess = (createSuccess == undefined || createSuccess.length == 0) ? "" : createSuccess
    emailRegistered = (emailRegistered == undefined || emailRegistered.length == 0) ? "" : emailRegistered

    res.render("users/new", { emailError, nomeError, passwordError, nome: nome, email: email, createSuccess, emailRegistered })
})

router.post("/users/create", (req, res) => {
    var { nome, email, password } = req.body

    var nomeError
    var emailError
    var passwordError

    if (nome == "" || nome == undefined) {
        nomeError = "Nome não pode ser vazio"
    }

    if (email == "" || email == undefined) {
        emailError = "Email não pode ser vazio"
    }

    if (password == "" || password == undefined) {
        passwordError = "Senha não pode ser vazia"
    }

    if (email != "" && nome != "" && password != "" && password.length >= 5) {
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == undefined) {
                var salt = bcrypt.genSaltSync(10)
                var hash = bcrypt.hashSync(password, salt)

                User.create({
                    nome,
                    email,
                    password: hash
                }).then(() => {
                    var createSuccess = "Cadastrado com sucesso"

                    req.flash("createSuccess", createSuccess)
                    res.redirect("/users/new")
                }).cath(() => {
                    res.redirect("/users/new")
                })
            }
            else {
                var emailRegistered = "Email já registrado"

                req.flash("emailRegistered", emailRegistered)
                res.redirect("/users/new")
            }
        })
    }
    else {
        req.flash("emailError", emailError)
        req.flash("nomeError", nomeError)
        req.flash("passwordError", passwordError)

        req.flash("email", email)
        req.flash("nome", nome)

        res.redirect("/users/new")
    }
})


router.get("/users/login", (req, res) => {
    var emailError = req.flash("emailError")
    var passwordError = req.flash("passwordError")
    var email = req.flash("email")

    var passwordIncorrect = req.flash("passwordIncorrect")
    var emailIncorrect = req.flash("emailIncorrect")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    passwordError = (passwordError == undefined || passwordError.length == 0) ? undefined : passwordError

    email = (email == undefined || email.length == 0) ? "" : email

    passwordIncorrect = (passwordIncorrect == undefined || passwordIncorrect.length == 0) ? "" : passwordIncorrect
    emailIncorrect = (emailIncorrect == undefined || emailIncorrect.length == 0) ? "" : emailIncorrect


    res.render("users/login", { emailError, passwordError, email: email, passwordIncorrect, emailIncorrect })
})



router.post("/auth", (req, res) => {
    const { email, password } = req.body

    var emailError
    var passwordError

    if (email == "" || email == undefined) {
        emailError = "Email não pode ser vazio"
    }

    if (password == "" || password == undefined) {
        passwordError = "Senha não pode ser vazia"
    }

    req.flash("email", email)

    if (email != "" && password != "") {

        //procurar por um usuário com uma condição
        User.findOne({
            where: {
                email
            }
        }).then(user => {
            if (user != undefined) {

                //bcrypt vai comparar a senha digita e a senha no banco de dados
                //caso retonar um valor ela existe, caso n, ela n existe
                var correct = bcrypt.compareSync(password, user.password)

                if (correct) {
                    req.session.user = {
                        idUsuario: user.idUsuario,
                        nome: user.nome,
                        email: user.email,
                    }
                    //testar
                    //res.json(req.session.user)
                    res.redirect("/users/index")
                }
                else {
                    var passwordIncorrect = "Email ou senha incorretas"
                    req.flash("passwordIncorrect", passwordIncorrect)
                    res.redirect("/users/login")

                }
            }
            else {
                var emailIncorrect = "Email ou senha incorretas"
                req.flash("emailIncorrect", emailIncorrect)
                res.redirect("/users/login")
            }
        })
    }
    else {
        req.flash("emailError", emailError)
        req.flash("passwordError", passwordError)

        res.redirect("/users/login")
    }
})

router.get("/users/index", userAuth, (req, res) => {
    res.render("users/index", { user: req.session.user })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router