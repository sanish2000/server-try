const Route = require('express').Router();
const Dbconfig = require('./../configs/db-config')

function connect(cb) {
    Dbconfig.Client.connect(Dbconfig.ConxnURL, function (err, client) {
        if (err) {
            cb(err)
        }
        else {
            cb(null, client);
        }
    })
}

Route.get('/', function (req, res, next) {
    res.end('You are at home page')
})


Route.route('/')
    .get(function (req, res, next) {
        connect(function (err, db) {
            if (err) {
                return next(err)
            }
            var condition = {};
            db.collection('users')
                .find(condition)
                .toArray(function(err,users){
                    if(err){
                        return next(err)
                    }
                    res.status(200).json(users)
                })
        })
    })







module.exports = Route;