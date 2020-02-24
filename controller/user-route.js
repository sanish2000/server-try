const Route = require('express').Router();
const UserModel = require('./../models/user.model')




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
            const data = req.body;

            if (data.name)
                user.name = data.name;
            if (data.username)
                user.username = data.username;
            if (data.password)
                user.password = data.password;
            if (data.email)
                user.email = data.email;
            if (data.dob)
                user.dob = data.dob;
            if (data.gender)
                user.gender = data.gender;
            if (data.permanenet_address)
                user.address.permanent_address = data.permanent_address;
            if (data.temp_address)
                user.address.temp_address = data.temp_address.split(',');
            if (data.phoneNumber)
                user.phoneNumber = data.phoneNumber;
            if (data.status)
                user.status = true;
            if (data.inActiveStatus)
                user.status = false;
            if (data.role)
                user.role = data.role;

            user.save(function (err, updated) {
                if (err) {
                    return next(err)
                }
                res.status(200).json(updated)
            })
        })
    })








module.exports = Route;