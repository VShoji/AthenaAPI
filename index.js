const app = require('express')();

createDbConnection()

const port = 3000

// Logger middleware
app.use(require('./middleware/log.js'))

app.get('/', (req, res) => {
    res.status(200).send("Success")
})

app.listen(port, () => {
    console.log("Server listening to port: " + port);
})

async function createDbConnection() {
    const db = require('./bd');
    const con = await db.getConexao();

    if (!con) {
        console.log('Failed to establish database connection');
        process.exit(-1);
    }
}