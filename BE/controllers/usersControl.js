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
  const user = new User(
    _.pick(newUser, ["name", "email", "password", "admin"])
  );
  user.save();
};

const updateUser = async (data) => {
  let dataToSave = _.pick(data, ["_id", "name", "email", "password", "admin"]);
  console.log();
  const users = await User.updateOne(
    {
      _id: dataToSave._id,
    },
    dataToSave,
    {
      upsert: true,
    }
  );
  return users;
};

const deleteUserById = async (id) => {
  const users = await User.deleteOne({
    _id: id,
  });
  return users;
};

module.exports = {
  getUsers,
  getUserById,
  saveUsers,
  updateUser,
  deleteUserById,
};
