const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  productImages: [
    { img: String },
  ],
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    min: 3,
    max: 200,
  },
  offer: {
    type: Number,
    max: 100,
    min: 0,
  },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;
