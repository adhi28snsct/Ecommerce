const express = require("express");
const { userSignup } = require("../model/signup");
const bcrypt = require("bcrypt");

exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  try {
    const olduser = await userSignup.findOne({ email });
    if (olduser) {
      return res.json("user already exists");
    }
    await userSignup.create({
      name,
      email,
      password: encryptPassword,
    });
    res.send({ status: "ok", data: req.body });
  } catch (error) {
    console.log(error);
  }
};

exports.getuser = async (req, res) => {
  try {
    const alldata = await userSignup.find({});
    res.send({ status: "ok", data: alldata });
  } catch (error) {
    console.log(error, "USER FETC ERROR");
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.param.id;
    const user = await userSignup.findById(id);
    await userSignup.deleteOne(id);
    res.send({ status: "deleted" });
  } catch (error) {
    console.log(error, "USER DELETE ERROR");
  }
};
