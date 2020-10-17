const { Order } = require("../models/order");
const _ = require("lodash");

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const getOrderById = async (id) => {
  const order = await Order.find({
    _id: id,
  }).catch((err) => {
    console.log("ERROR", err);
    return null;
  });
  return order;
};

const saveOrders = (newOrder) => {
  const order = new Order(
    _.pick(newOrder, ["custName", "orderItems", "important", "totalPrice"])
  );
  order.save();
};

const updateOrder = async (data) => {
  let dataToSave = _.pick(data, [
    "_id",
    "custName",
    "orderItems",
    "totalPrice",
    "important",
    "createdAt",
  ]);
  const orders = await Order.updateOne(
    {
      _id: dataToSave._id,
    },
    dataToSave,
    {
      upsert: true,
    }
  );
  return orders;
};

const deleteOrderById = async (id) => {
  const orders = await Order.deleteOne({
    _id: id,
  });
  return orders;
};

module.exports = {
  getAllOrders,
  getOrderById,
  saveOrders,
  updateOrder,
  deleteOrderById,
};
