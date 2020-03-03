const ProductControl = require('./product.controller');

const Router = require('express').Router();

Router.route('/')
    .get(ProductControl.get)
    .post(ProductControl.post);

Router.route('/search')
    .get(ProductControl.search)
    .post(ProductControl.search);


Router.route('/:id')
    .get(ProductControl.getById)
    .put(ProductControl.put)
    .delete(ProductControl.remove);


module.exports = Router 