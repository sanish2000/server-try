const Express = require('express');
const App = Express();
var port = 3030;
const Path = require('path');
const NewRouter = require('./controller/main-route');
const UserRouter = require('./controller/user-route');
require('./db'); 




var Pug = require('pug');
App.set('viewEngine', Pug);
App.set('views', Path.join(__dirname, 'views'));


//import

App.use(Express.urlencoded({
    extended: true
}))
App.use(Express.json());


//Routes

App.use('/new', NewRouter)
App.use('/user', UserRouter)







// load route middle ware

App.use(function (error, req, res, next) {
    console.log('i am error handling middleware');
    res.json({
        text: 'error handling middleware',
        msg: error.msg || error,
        status: error.status || 400
    })
});


App.listen(port, function (err, done) {
    if (err) {
        console.log('err in listening');
    } else {
        console.log('server listen at port' + port)
    }
})