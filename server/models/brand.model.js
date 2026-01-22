const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,

  }
}, { timestamps: true });


const brandModel = mongoose.model('Brand', brandSchema);

module.exports = brandModel;