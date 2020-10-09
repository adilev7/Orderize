const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./routes/products");
const orders = require("./routes/orders");
const users = require("./routes/users");
const auth = require("./routes/auth");

mongoose;
require("./config/connectDB")()
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//cross origin- 25.08
app.use(require("morgan")("dev"));
app.use(cors());
app.use(express.json());

app.use("/orders", orders);
app.use("/products", products);
app.use("/users", users);
app.use("/auth", auth);

//cross origin- 25.08
app.get("/", (req, res) => res.json("ok"));

const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
