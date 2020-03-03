const ProductQuery = require('./product.query');

function get(req, res, next) {
    const condition = {};
    ProductQuery
        .find(condition)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            console.log('producterror')
            next(err);
        })
}

function post(req, res, next) {
    console.log('req.body??', req.body)
    const data = req.body;
    ProductQuery.insert(data)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err)
        })
}
function getById(req, res, next) {
    var condition = { _id: req.params.id };
    ProductQuery
        .find(condition)
        .then(function (data) {
            res.status(200).json(data[0]);
        })
        .catch(function (err) {
            next(err);
        })
}


function search(req, res, next) {
    const searchCondition = {};

    ProductQuery
        .find(searchCondition)
        .then(function (data) {
            res.status(200), json(data);
        })
        .catch(function (err) {
            next(err)
        })
}

function put(req, res, next) {
    const data = req.body;
    ProductQuery
        .update(req.params.id, data)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })

}

function remove(req, res, next) {
    ProductQuery
        .remove(req.params.id)
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        });
}








module.exports = {
    get,
    getById,
    post,
    search,
    put,
    remove
}