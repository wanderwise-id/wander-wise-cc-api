
const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts } = require('../controllers/productController');
const { uploadPostImage } = require('../controllers/uploads');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadPostImage);

module.exports = router;