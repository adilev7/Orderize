const express = require("express");
const _ = require("lodash");
const router = express.Router();
const starredControl = require("../controllers/starredControl");

router.get("/", async (req, res) => {
  const starred = await starredControl.getAllStarred();
  res.send(starred);
});

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

module.exports = router;
