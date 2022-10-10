const app = require('express')();
const port = 3000;

// Logger middleware
app.use(require('./middleware/log.js'))

app.use(require('body-parser').json())

// Routes
app.use('/materia', require('./routes/materia.js'));
app.use('/user', require('./routes/authUser.js'));
app.use('/desempenho', require('./routes/desempenho.js'));

app.listen(port, () => {
    console.log("Server listening to port: " + port);
})
