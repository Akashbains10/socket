const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.')[1];
        const uniqueSuffix = `${Date.now()}.${extension}`
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage });

module.exports = upload