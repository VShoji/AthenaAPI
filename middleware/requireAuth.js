const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const header = req.headers.authorization.split(' ');
    const method = header[0];
    const tok = header[1];

    if (method == "Bearer") {
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
            return;
        });
    }

    res.status(400).send('Bad Request');
}