const slugify = require('slugify');
const Product = require('../models/product');

exports.addProduct = async (req, res) => {
  const {
    name,
    description,
    offer,
    price,
    quantity,
  } = req.body;
  let productImages;
  if (req.files.length > 0) {
    productImages = req.files.map((file) => ({ img: file.filename }));
  }
  const product = new Product({
    name,
    description,
    offer,
    price,
    slug: slugify(name),
    createdBy: req.user._id,
    productImages,
    quantity,
  });
  const savedProduct = await product.save();
  try {
    if (savedProduct === product) {
      res.status(200).json({ savedProduct });
    } else {
      return res.status(400).json({ message: 'error saving the product' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'something went wrong', error });
  }
  return null;
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error, message: 'something went wrong' });
  }
};
