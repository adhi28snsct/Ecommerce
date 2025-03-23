const mongoose = require("mongoose");

const gallery = new mongoose.Schema({
  imgname: String,
  imgdesc: String,
  image: Object,
});

const galleryDB = mongoose.model("galleryCollection", gallery);
exports.galleryDB = galleryDB;
