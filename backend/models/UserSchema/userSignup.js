const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"], //email validation
  },

  userPhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", userSignupSchema);

module.exports = Users;
