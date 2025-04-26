const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderItemSchema = require('./orderITEM.JS'); // make sure file name is correct!

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  address: {
    type: String,
    required: true
  },
  orderItem: {
    type: [orderItemSchema],
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["Online", "COD"],
    default: "COD"
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    default: "Pending"
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;