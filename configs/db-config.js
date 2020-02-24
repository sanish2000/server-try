
const Mongodb = require('mongodb');


module.exports = {
    Client: Mongodb.MongoClient,
    ConxnURL: 'mongodb://127.0.0.1:27017',
    DbName: 'group21db',
    ColName: 'users',
}





// const Mongodb = require('mongodb');
// const Client = Mongodb.MongoClient;
// const ConxnURL = 'mongodb"//127.0.0.1:27017';
// const DbName = 'group21db';
// const ColName = 'users';