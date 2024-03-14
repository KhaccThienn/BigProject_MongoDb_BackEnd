const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images");
    },
    filename: (req, file, callback) => {
        let fileType = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (fileType.indexOf(file.mimetype) === -1) {
            let errorMessage = `File: ${file.originalname} is invalid`;
            return callback(errorMessage, null);
        }
        let fileName = Date.now() + "-" + file.originalname;
        callback(null, fileName);
    }
});

const uploadFile = multer({
    storage: diskStorage
});

module.exports = uploadFile;