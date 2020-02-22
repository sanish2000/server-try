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
    connect
})







module.exports = Route;