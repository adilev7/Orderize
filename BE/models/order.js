const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { Product } = require("./product");
/* const { string } = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config"); */

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
  // price: {
  //   type: Number,
  //   required: true,
  // },
});

const orderSchema = new mongoose.Schema({
  custName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  orderItems: [orderItem],

  // totalPrice: { type: Number, required: true },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

/* JWT */
/* orderSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
}; */

const Order = mongoose.model("Order", orderSchema);

/* function validateOrder(order) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
  });

  return schema.validate(order);
} */

/* function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });

  return schema.validate(data);
} */
exports.Order = Order;
/* exports.validate = validateOrder;
exports.validateCards = validateCards; */
