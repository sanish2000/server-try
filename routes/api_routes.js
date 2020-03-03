const Router = require('express').Router();
const authenticate = require('./../middlerwares/authenticate');

// load application route

const NewRoute = require('./../controller/main-route');
const UserRoute = require('./../controller/user-route');
const ProductRoute = require('./../modules/product/product.route')




//Routes

Router.use('/new', NewRoute);
Router.use('/user',authenticate, UserRoute);
Router.use('/product',authenticate, ProductRoute);

module.exports = Router