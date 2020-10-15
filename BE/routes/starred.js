const express = require("express");
const _ = require("lodash");
const starredControl = require("../controllers/starredControl");
const router = express.Router();

/* PRODUCTS ENDPOINTS */
// router.get("/", async (req, res) => {
//   const starred = await starredControl.getStarred();
//   res.send(starred);
// });

router.get("/:id", async (req, res) => {
  const starred = await starredControl.getStarredByUser(req.params.id);
  if (!starred) {
    res.status(404);
  }
  res.send(starred);
});

router.post("/", (req, res) => {
  const starred = starredControl.saveStarred(req.body);
  res.send(starred);
});

router.put("/:id", async (req, res) => {
  const starred = await starredControl.updateStarred(req.body);
  res.send(starred);
});

// router.delete("/:id", async (req, res) => {
//   const starred = await starredControl.deleteStarredById(req.params.id, req.body);
//   res.send(starred);
// });
/* ITEMS ENDPOINTS */
// router.get("/:orderId/:itemId", async (req, res) => {
//   const starredItem = await starredControl.getItemById(
//     req.params.starredId,
//     req.params.itemId
//   );
//   res.send(starredItem);
// });

// router.put("/:starredId/:itemId", async (req, res) => {
//   const starred = await starredControl.deleteItemById(
//     req.params.starredId,
//     req.params.itemId
//   );
//   res.send(starred);
// });

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
