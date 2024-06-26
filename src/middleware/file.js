// сохраняю картинки с помощью multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'deliveryData/loaded');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileMulter = multer({ storage });

module.exports = fileMulter;