const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'seller'],
    default: 'user'
  },
  shopName: {
    type: String,
    required: function () {
      return this.role === 'seller'
    }
  }

}, { timestamps: true });


const User = mongoose.model('userInfo', userSchema);

module.exports = { User }