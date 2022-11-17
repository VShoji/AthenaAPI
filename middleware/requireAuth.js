const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tok = req.headers.authorization;
    jwt.verify(tok, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send('Access denied');
            return;
        }

        const cookie = {
            token: tok,
            user: decoded
        }

        res.locals.cookie = cookie;
        next();
    });
}