const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).catch((err) => err);
  return user;
};

const validateUser = async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }).catch((err) => err);
  if (user) return res.status(409).send("User already registered.");
};

const saveUser = async (req, res) => {
  let user = new User(_.pick(req.body, ["email", "password", "admin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "email"]));
};

module.exports = {
  getUserByEmail,
  validateUser,
  saveUser,
};
