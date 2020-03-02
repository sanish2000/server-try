const Multer = require('multer');


var myStorage = Multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads/images')
    }
});

function filter(req, file, cb) {
    var mimeType = file.mimetype.split('/')[0];
    if (mimeType === 'image'){
        cb(null,true)
    }else{
        req.fileErr = true;
        cb(null,false)
    }
    
}
var Upload = Multer({
    storage: myStorage,
    fileFilter:filter
})

module.exports = Upload;