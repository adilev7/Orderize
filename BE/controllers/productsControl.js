const { Product } = require("../models/product");
const _ = require("lodash");

/* ORDERS FUNCTIONS */

const getProducts = async () => {
  const products = await Product.find()
    .then(() => console.log("PRODUCTS:", products) /* products */)
    .catch((err) => {
      console.log("getProducts fail", err);
      return null;
    });
};

const getProductById = async (id) => {
  const product = await Product.find({
    _id: id,
  }).catch((err) => {
    console.log("ERROR", err);
    return null;
  });
  return product;
};

const saveProduct = (newProduct) => {
  const product = new Product(
    _.pick(newProduct, ["SN", "description", "createdAt"])
  );
  product.save();
};

const updateProduct = async (data) => {
  let dataToSave = _.pick(data, ["_id", "SN", "description", "createdAt"]);
  console.log();
  const product = await Product.updateOne(
    {
      _id: dataToSave._id,
    },
    dataToSave,
    {
      upsert: true,
    }
  );
  return product;
};

const deleteProductById = async (id) => {
  const product = await Product.deleteOne({
    _id: id,
  });
  return product;
};

/* ITEMS FUNCTIONS */

/* const getItemById = async (orderId, itemId) => {
  const orders = await getOrderById(orderId);
  const orderItems = orders[0]["orderItems"];
  const orderItem = await orderItems.find((item) => item._id == itemId);
  return orderItem;
}; */

module.exports = {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProductById,
};
