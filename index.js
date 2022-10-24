const app = require('express')();
require('dotenv').config()

const port = 3000;

// Logger middleware
app.use(require('./middleware/log.js'))

app.use(require('body-parser').json())

// Routes
app.use('/material', require('./routes/material'))
app.use('/materia', require('./routes/materia.js'));
app.use('/user', require('./routes/authUser.js'));
app.use('/desempenho', require('./routes/desempenho.js'));
app.use('/exercicio', require('./routes/exercicio.js'));


app.listen(port, () => {
    console.log("Server listening to port: " + port);
})
