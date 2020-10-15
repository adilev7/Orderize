const mongoose = require("mongoose");

const starredSchema = new mongoose.Schema({
  user: { type: String, required: true },
  orders: { type: Array, required: true },
});

const Starred = mongoose.model("Starred", starredSchema, "starred");

exports.Starred = Starred;
