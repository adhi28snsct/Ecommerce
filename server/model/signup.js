const mongoose = require("mongoose");

const signup = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: Object,
});

const userSignup = mongoose.model("User-signup", signup);
exports.userSignup = userSignup;
