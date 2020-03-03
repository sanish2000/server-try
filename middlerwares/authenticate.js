const JWT = require('jsonwebtoken');
const Config = require('./../configs/index');


module.exports = function (req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    if (req.headers['token']) {
        token = req.headers['token']
    }
    if (token) {
        JWT.verify(token, Config.jwt_secret, function (err, decoded) {
            if (err) {
                return next(err);
            }
            Console.log('decoded>>',decoded)
            next();
        })
    }
    else {
        next({
            msg: 'token not provided',
            status: 400
        })
    }
}