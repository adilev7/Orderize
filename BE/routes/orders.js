const _ = require("lodash");
const express = require("express");
const router = express.Router();
const ordersControl = require("../controllers/ordersControl");

router.get("/", async (req, res) => {
  const orders = await ordersControl.getAllOrders();
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

module.exports = router;
