const Route = require('express').Router();
const UserModel = require('./../models/user.model')
const map_user_req = require('./../helper/map_user_req')
const PasswordHash = require('password-hash');
const Multer = require('multer');
// const Upload = Multer({
//     dest: './uploads'
// })
var myStorage = Multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,Date.now() +'-' + file.originalname)
    },
    destination: function(req,file,cb){
        cb(null,'./uploads/images')
    }
});
var Upload = Multer({
    storage: myStorage
})


Route.post('/login', function (req, res, next) {
    UserModel.findOne({
        username: req.body.username
    })
        .then(function (user) {
            if (user) {
                //password Verification
                var isMatched = PasswordHash.verify(req.body.password, user.password);
                if (isMatched) {
                    res.status(200).json(user);
                } else {
                    next({
                        msg: 'Invalid Password'
                    })
                }
            } else {
                next({
                    msg: 'Invalid Username'
                })
            }
        })
        .catch(function (err) {
            next(err);
        })
})




Route.post('/register', Upload.single('img'), function (req, res, next) {
    console.log('req.file>>>',req.file)
    console.log('req.body>>>',req.body)

    const data = req.body;
    if(req.file){
        data.image = req.file.filename;
    }
    var newUser = new UserModel({});

    var newMapUser = map_user_req(newUser, data);
    newMapUser.password = PasswordHash.generate(req.body.password);
    newMapUser.save(function (err, saved) {
        if (err) {
            return next(err);
        }
        res.status(200).json(saved)
    })
})





module.exports = Route;