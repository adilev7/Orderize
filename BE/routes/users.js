const express = require("express");
const _ = require("lodash");
const usersControl = require("../controllers/usersControl");
const router = express.Router();

/* ORDERS ENDPOINTS */
router.get("/", async (req, res) => {
  const users = await usersControl.getUsers();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await usersControl.getUserById(req.params.id);
  res.send(user);
});

router.post("/", async (req, res) => {
  const user = await usersControl.saveUsers(req.body);
  res.send(user);
});

router.put("/", async (req, res) => {
  const user = await usersControl.updateUser(req.body);
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await usersControl.deleteUserById(req.params.id);
  res.send(user);
});

module.exports = router;
