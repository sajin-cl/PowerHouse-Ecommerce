const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });


const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;