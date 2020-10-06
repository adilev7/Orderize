// const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
/* const { string } = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config"); */

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

/* JWT */
/* orderSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
}; */

const Product = mongoose.model("Product", productSchema);

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
exports.Product = Product;
/* exports.validate = validateOrder;
exports.validateCards = validateCards; */
