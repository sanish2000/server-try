const ProductControl = require('./product.controller');

const Router = require('express').Router();

Router.route('/')
    .get(ProductControl.get)
    .post(ProductControl.post);

Router.route('/search')
    .get(ProductControl.search)

Router.route('/:id')
    .get(ProductControl.getById)
    .put(ProductControl.getById)
    .delete(ProductControl.getById);


module.exports = Router 