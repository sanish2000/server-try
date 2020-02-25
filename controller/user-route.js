const Route = require('express').Router();
const UserModel = require('./../models/user.model')
const map_user_req = require('./../helper/map_user_req')




Route.route('/')
    .get(function (req, res, next) {
        var condition = {};
        UserModel
            .find(condition, {
                password: 0
            })
            .sort({
                _id: -1
            })
            .exec(function (err, user) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(user);
            })
    })

Route.route('/:id')
    .get(function (req, res, next) {
        UserModel.findById(req.params.id)
            .exec(function (err, user) {
                if (err) {
                    return (err)
                }
                res.status(200).json(user)
            })
    })
    .delete(function (req, res, next) {
        UserModel.findById(req.params.id)
            .then(function (user) {
                if (user) {
                    user.remove(function (err, removed) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(removed);
                    })
                } else {
                    next({
                        msg: 'user not found',
                        status: 404
                    })
                }
            })
            .catch(function (err) {
                next(err);
            })
    })
    .put(function (req, res, next) {
        var id = req.params.id;
        const data = req.body;

        UserModel.findById(id, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next({
                    msg: 'user not found',
                    status: 404
                });
            }

            var updatedUser = map_user_req(user,data);

            updatedUser.save(function (err, updated) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(updated)
            })
        })
    })








module.exports = Route;