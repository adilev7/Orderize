const express = require("express");
const router = express.Router();
const usersControl = require("../controllers/usersControl");

router.post("/", async (req, res) => {
  const error = await usersControl.validateUser(req, res);
  if (error) return;
  usersControl.saveUser(req, res);
});

router.post("/default", async (req, res) => {
  try {
    let user = await usersControl.getUserByEmail(req.body.email);
    if (user) return res.send("Default user exists");
    usersControl.saveUser(req, res);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
