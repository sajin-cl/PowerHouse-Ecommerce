const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userInfo',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userInfo'
    },
    status: {                              
      type: String,
      enum: ['pending', 'shipped', 'delivered','cancelled'],
      default: 'pending'
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
