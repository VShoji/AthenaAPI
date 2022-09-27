module.exports = (req, res, next) => {
    console.log('> Recieved ' + req.method + ' request');
    console.time('Request duration');

    next();

    console.timeEnd('> Request duration');
}