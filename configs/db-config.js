
const Mongodb = require('mongodb');


module.exports = {
    Client: Mongodb.MongoClient,
    ConxnURL: 'mongodb://127.0.0.1:27017',
    DbName: 'group21db',
    ColName: 'users',
}