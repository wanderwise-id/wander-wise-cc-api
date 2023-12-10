const Product = require('../models/Product.js');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// const createProduct = async (req, res) => {
//   const product = await Product.create(req.body);
//   res.status(StatusCodes.CREATED).json({ product });
// };

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const createProduct = async (req, res) => {
  // Extract product data from request body
  const { name, price } = req.body;

  // Validate product data (you may want to add more validation)
  if (!name || !price) {
    throw new CustomError.BadRequestError('Product name and price are required.');
  }

  // Check if image file is present in the request
  if (!req.files || !req.files.image) {
    throw new CustomError.BadRequestError('Image file is required.');
  }

  // Handle image upload
  const date = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const newfileName = `${randomString}-${date}`;

  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    filename: newfileName,
    folder: 'file-upload',
  });

  // Remove the temporary file
  fs.unlinkSync(req.files.image.tempFilePath);

  // Create a new product in the database with image URL
  const product = await Product.create({
    name,
    price,
    image: result.secure_url,
  });

  res.status(StatusCodes.CREATED).json({ product });

};

module.exports = {
  createProduct,
  getAllProducts,
};