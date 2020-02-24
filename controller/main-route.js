const Route = require('express').Router();
const UserModel = require('./../models/user.model')



Route.post('/login', function (req, res, next) {
    UserModel.findOne({
        username: req.body.username
    })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            next(err);
        })
})




Route.post('/register', function (req, res, next) {
    const data = req.body;
    var newUser = new UserModel({});

    newUser.name = data.name;
    newUser.username = data.username;
    newUser.password = data.password;
    newUser.email = data.email;
    newUser.dob = data.dob;
    newUser.gender = data.gender;
    newUser.address = {
        permanent_address: data.permanent_address,
        temp_address: data.temp_address.split(',')
    }
    newUser.phoneNumber = data.phoneNumber;
    newUser.status = data.status;
    newUser.save(function (err, saved) {
        if (err) {
            return next(err);
        }
        res.status(200).json(saved)
    })
})





module.exports = Route;