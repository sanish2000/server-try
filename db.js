const Mongoose = require('mongoose');
const DbConfig = require('./configs/db-config') ;
Mongoose.connect(`${DbConfig.ConxnURL}/${DbConfig.DbName}`,{
    useUnifiedTopology:true,
    useNewUrlParser:true
},function(err,done){
    if(err){
        console.log('error in connecting to db', err);
    }
    else{
        console.log('db connection sucess ')
    }
})