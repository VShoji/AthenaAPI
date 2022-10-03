const app = require('express')();
const port = 3000

// Logger middleware
app.use(require('./middleware/log.js'))

// Routes
app.use('/materia', require('./routes/materia.js'))
// app.use('/user', require('./routes/authUser.js'))
app.use('/material', require('./routes/material'))

app.listen(port, () => {
    console.log("Server listening to port: " + port);
})