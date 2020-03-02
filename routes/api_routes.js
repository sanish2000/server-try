const Router = require('express').Router();


// load application route

const NewRoute = require('./../controller/main-route');
const UserRoute = require('./../controller/user-route');
const ProductRoute = require('./../modules/product/product.route')




//Routes

Router.use('/new', NewRoute);
Router.use('/user', UserRoute);
Router.use('/product', ProductRoute);

module.exports = Router