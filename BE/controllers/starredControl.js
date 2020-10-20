const { Starred } = require("../models/starred");
const _ = require("lodash");

const getAllStarred = async () => {
  const starred = await Starred.find().catch((err) => {
    console.log("ERROR", err);
    return null;
  });
  return starred;
};

const getStarredByUser = async (userId) => {
  const starred = await Starred.find({
    user: userId,
  }).catch((err) => {
    console.log("ERROR", err);
    return null;
  });
  return starred;
};

const saveStarred = (newStarred) => {
  const starred = new Starred(_.pick(newStarred, ["user", "orders"]));
  const xxx = starred.save();
};

const updateStarred = async (data) => {
  let dataToSave = _.pick(data, ["_id", "user", "orders"]);
  const starred = await Starred.updateOne({ _id: dataToSave._id }, dataToSave, {
    upsert: true,
  });
  return starred;
};

const deleteStarredById = async (id) => {
  const starred = await Starred.deleteOne({
    _id: id,
  });
  return starred;
};

module.exports = {
  getAllStarred,
  getStarredByUser,
  saveStarred,
  updateStarred,
  deleteStarredById,
};
