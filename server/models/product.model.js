const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  oldPrice: {
    type: Number
  },
  image_url: {
    type: String,
    required: true,
    trim: true
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'userInfo',
    required: true
  },
  isSeller: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;