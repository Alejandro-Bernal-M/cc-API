const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { requireSignin, adminMiddleware } = require('../common-middlewares/index');
const { addProduct } = require('../controllers/product');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function filename(req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/products', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);

module.exports = router;
