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

// function validateProduct(product) {
//   const schema = Joi.object({
//     description: Joi.string().min(2).max(255).required(),
//     inStorage: Joi.number().required(),
//     price: Joi.number().required(),
//     createdAt: Joi.string(),
//   });

//   return schema.validate(product);
// }

/* function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });

  return schema.validate(data);
} */
exports.Product = Product;

