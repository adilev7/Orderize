const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  inStorage: {
    type: Number,
    required: true,
    minlength: 1,
  },

  price: {
    type: Number,
    required: true,
    minlength: 1,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;

