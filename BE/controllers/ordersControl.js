const { Order } = require("../models/order");
const _ = require("lodash");

/* ORDERS FUNCTIONS */

const getOrders = async () => {
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
    _.pick(newOrder, ["custName", "orderItems", "totalPrice"])
  );
  order.save();
};

const updateOrder = async (data) => {
  let dataToSave = _.pick(data, [
    "_id",
    "custName",
    "orderItems",
    "totalPrice",
    "createdAt",
  ]);
  console.log();
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

/* ITEMS FUNCTIONS */

/* const getItemById = async (orderId, itemId) => {
  const orders = await getOrderById(orderId);
  const orderItems = orders[0]["orderItems"];
  const orderItem = await orderItems.find((item) => item._id == itemId);
  return orderItem;
}; */

const deleteItemById = async (orderId, itemId) => {
  const order = await Order.updateOne(
    {
      _id: orderId,
    },
    {
      $pull: {
        orderItems: {
          _id: itemId,
        },
      },
    }
  );
  return order;
};

const addItem = async (orderId, orderItem) => {
  const order = await Order.updateOne(
    {
      _id: orderId,
    },
    {
      $push: {
        orderItems: {
          orderItem,
        },
      },
    },
    {
      upsert: true,
    }
  );
  return order;
};

module.exports = {
  getOrders,
  getOrderById,
  saveOrders,
  updateOrder,
  deleteOrderById,
  /*   getItemById, */
  deleteItemById,
  addItem,
};
