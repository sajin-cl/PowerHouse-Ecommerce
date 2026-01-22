const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  catDescription: {
    type: String,
  }

}, { timestamps: true });


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;