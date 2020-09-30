const express = require("express");
const _ = require("lodash");
const ordersControl = require("../controllers/ordersControl");
/* const bcrypt = require("bcrypt"); */
/* const _ = require("lodash"); */
const router = express.Router();

/* ORDERS ENDPOINTS */
router.get("/", async (req, res) => {
  const orders = await ordersControl.getOrders();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const order = await ordersControl.getOrderById(req.params.id);
  if (!order) {
    res.status(404);
  }
  res.send(order);
});

router.post("/", (req, res) => {
  const order = ordersControl.saveOrders(req.body);
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await ordersControl.updateOrder(req.body);
  res.send(order);
});

router.delete("/:id", async (req, res) => {
  const order = await ordersControl.deleteOrderById(req.params.id);
  res.send(order);
});
/* ITEMS ENDPOINTS */
router.get("/:orderId/:itemId", async (req, res) => {
  const orderItem = await ordersControl.getItemById(
    req.params.orderId,
    req.params.itemId
  );
  res.send(orderItem);
});

router.put("/:orderId/:itemId", async (req, res) => {
  const order = await ordersControl.deleteItemById(
    req.params.orderId,
    req.params.itemId
  );
  res.send(order);
});

/* router.put("/:orderId", async (req, res) => {
  const order = await ordersControl.addItem(req.params.orderId, req.body);
  res.send(order);
}); */

/* router.post("/:orderId", async (req, res) => {
  const orderItems = await ordersControl.addItem(req.params.orderId, req.body);
  res.send(orderItems);
}); */

/* router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

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
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
}); */

module.exports = router;
