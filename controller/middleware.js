const Route = require('express').Router();
const Dbconfig = require('./../configs/db-config')

// function connect(cb) {
//     Dbconfig.Client.connect(Dbconfig.ConxnURL, function (err, client) {
//         if (err) {
//             cb(err)
//         }
//         else {
//             cb(null, client);
//         }
//     })
// }

Route.get('/', function (req, res, next) {
    res.end('You are at home page')
})

Route.get('/login', function (req, res, next) {
    res.render('login.pug', {
        title: 'Login'
    })
})

Route.post('/login', function (req, res, next) {
    console.log('im at login post request')
    Client.connect(ConxnURL, function (err, client) {
        if (err) {
            return next(err)
        }
        const db = client.db(DbName)
        db.collection(ColName).find({
            username: req.body.username
        })
            .toArray(function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(user)
            })
    })
})

Route.get('/register', function (req, res, next) {
    res.render('register.pug', {
        title: 'Register'
    })
})

Route.post('/register', function (req, res, next) {
    Client.connect(ConxnURL, function (err, client) {
        if (err) {
            return next(err);
        }
        console.log('connected to database');
        const db = client.db(DbName);
        db.collection(ColName).insert(req.body, function (err, done) {
            if (err) {
                return next(err)
            }
            res.status(200).json(done);
        })
    });
})





module.exports = Route;