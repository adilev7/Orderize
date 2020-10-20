const express = require("express");
const _ = require("lodash");
const router = express.Router();
const productsControl = require("../controllers/productsControl");

router.get("/", async (req, res) => {
  const products = await productsControl.getProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await productsControl.getProductById(req.params.id);
  if (!product) {
    res.status(404);
  }
  res.send(product);
});

router.post("/", (req, res) => {
  const product = productsControl.saveProduct(req.body);
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const product = await productsControl.updateProduct(req.body);
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await productsControl.deleteProductById(req.params.id);
  res.send(product);
});

module.exports = router;
