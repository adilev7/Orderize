const { User } = require("../models/user");
const _ = require("lodash");

/* USERS FUNCTIONS */

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id) => {
  const user = await User.find({
    _id: id,
  });
  return user;
};

const saveUsers = (newUser) => {
  const user = new User(_.pick(newUser, ["email", "password", "admin"]));
  user.save();
};

const updateUser = async (data) => {
  let dataToSave = _.pick(data, ["_id", "email", "password", "admin"]);
  console.log();
  const user = await User.updateOne(
    {
      _id: dataToSave._id,
    },
    dataToSave,
    {
      upsert: true,
    }
  );
  return user;
};

const deleteUserById = async (id) => {
  const user = await User.deleteOne({
    _id: id,
  });
  return user;
};

module.exports = {
  getUsers,
  getUserById,
  saveUsers,
  updateUser,
  deleteUserById,
};
