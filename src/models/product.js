const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
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
    quantity: {
      type: Number,
      required: true,
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;
