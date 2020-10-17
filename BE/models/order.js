const mongoose = require("mongoose");

const orderItem = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  orderItems: [orderItem],

  totalPrice: { type: Number, required: true },

  important: { type: Boolean, default: false, required: true },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
