const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { User, validate, validateCards } = require("../models/user");

// const usersControl = require("../controllers/usersControl");
const router = express.Router();

/* USERS ENDPOINTS */
// router.get("/", async (req, res) => {
//   const users = await usersControl.getUsers();
//   res.send(users);
// });

// router.get("/:id", async (req, res) => {
//   const user = await usersControl.getUserById(req.params.id);
//   res.send(user);
// });

// router.post("/", async (req, res) => {
//   const user = await usersControl.saveUsers(req.body);
//   res.send(user);
// });

// router.put("/", async (req, res) => {
//   const user = await usersControl.updateUser(req.body);
//   res.send(user);
// });

// router.delete("/:id", async (req, res) => {
//   const user = await usersControl.deleteUserById(req.params.id);
//   res.send(user);
// });

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "admin"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
