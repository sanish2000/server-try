var Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        uniqued: true,
        sparse: true
    },
    phoneNumber: Number,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    address: {
        permanent_address: String,
        temp_address: [String]
    },
    dob: Date,
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: Number, //1.admin //2.user
        default: 2
    },
    image:String
},{
    timestamps:true
})

const UserModel = Mongoose.model('user', UserSchema)
module.exports = UserModel;