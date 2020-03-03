const ProductModel = require('./product.model');

function map_product_req(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;
    if (productDetails.description)
        product.description = productDetails.description;
    if (productDetails.category)
        product.category = productDetails.category;
    if (productDetails.price)
        product.price = productDetails.price;
    if (productDetails.color)
        product.color = productDetails.color;
    if (productDetails.brand)
        product.brand = productDetails.brand;
    if (productDetails.status)
        product.status = productDetails.status;
    if (productDetails.size)
        product.size = productDetails.size;
    if (productDetails.manuDate)
        product.manuDate = productDetails.manuDate;
    if (productDetails.expiryDate)
        product.expiryDate = productDetails.expiryDate;
    if (productDetails.modelNo)
        product.modelNo = productDetails.modelNo;
    if (productDetails.vendor)
        product.vendor = productDetails.vendor;
    if (productDetails.images)
        product.images = productDetails.images;
    if (productDetails.tags)
        product.tags = typeof (productDetails) === "String"
            ? productDetails.tags.split(',')
            : productDetails.tags
    if (productDetails.offers)
        product.offers = typeof (productDetails) === "String"
            ? productDetails.offers.split(',')
            : productDetails.offers
    if (product.discount || productDetails.discountedItem == 'true') {
        // note data received from postman(x-www-form-urlencoded) will be in string
        if (!product.discount) {
            // for insert
            product.discount = {};
        }
        // for update
        product.discount.discountedItem = productDetails.discountedItem == 'true' ?
            true :
            false;
        if (productDetails.discountedType)
            product.discount.discountedType = productDetails.discountedType;
        if (productDetails.discount)
            product.discount.discount = productDetails.discount;
    }


    if (productDetails.warrantyItem == 'true') {
        // note data received from postman(x-www-form-urlencoded) will be in string
        product.warranty = {};
        product.warranty.warrantyItem = productDetails.warrantyItem;
        product.warranty.warrantyPeriod = productDetails.warrantyPeriod;
    }
    if (productDetails.reviewPoint && productDetails.reviewMessage) {
        let reviews = {
            point: productDetails.reviewPoint,
            message: productDetails.reviewMessage,
            user: productDetails.user
        };
        product.reviews.push(reviews);
    }


    return product;

}

function find(condition) {
    return ProductModel
        .find(condition)
        .sort({
            _id: -1
        })
        .exec();
}

function insert(data) {
    var newProduct = new ProductModel({});
    //mutaion
    map_product_req(newProduct, data);
    return newProduct
        .save();

}
function update(id, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id)
            .exec(function (err, product) {
                if (err) {
                    return reject(err);
                }
                if (!product) {
                    return reject({
                        msg: "product not found"
                    })
                }
                var mappedUpdatedProduct = map_product_req(product, data);
                mappedUpdatedProduct.save(function (err, updated) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updated)
                    }
                })
            })
    })
}

function remove(id) {
    return ProductModel.findByIdAndRemove(id);
}

module.exports = {
    find,
    insert,
    update,
    remove,
    map_product_req
}