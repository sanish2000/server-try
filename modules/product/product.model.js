const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
    point: Number,
    messages: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const productSchema = new Schema({
    //db modelling
    name: String,
    description: String,
    price: Number,
    brand: String,
    category: {
        type: String,
        required: true
    },
    modelNo: String,
    color: String,
    size: String,
    manuDate: Date,
    expiryDate: Date,
    status: {
        type: String,
        enum: ['available', 'sold', 'out of stock'],
        default: 'available'
    },
    image: [String],
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    tags: [String],
    discount: {
        discountedItem: Boolean,
        discountedType: String,
        discount: String
    },
    warranty: {
        warrantyItem: Boolean,
        warrantyPeriod: String
    },
    offers: [String],
    reviews: [reviewSchema]
}, {
    timestamps: true
});
module.exports = Mongoose.model('product', productSchema);