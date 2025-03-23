const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { galleryDB } = require("../model/gallery");




exports.addGallery = async (req, res) => {
  const { imgname, imgdesc, image } = req.body;
  try {
    if (image) {
      const uploadres = await cloudinary.uploader.upload(image, {
        upload_preset: "gallery",
      });
      if (uploadres) {
        const gallery = new galleryDB({
          imgname,
          imgdesc,
          image: uploadres,
        });
        const savegallery = await gallery.save();
        res.send({ status: "ok", data: savegallery });
      }
    }
  } catch (error) {
    console.log(error, "ADD GALLERY ERROR");
  }
};

exports.getGallery = async (req, res) => {
  try {
    const alldata = await galleryDB.find({});
    res.send({ status: "ok", data: alldata });
  } catch (error) {
    console.log(error, "GET GALLERY ERROR");
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const id = req.param.id;
    const data = await galleryDB.findById(id);
    await galleryDB.deleteOne(data);
    res.send({ status: "deleted" });

  } catch (error) {
    console.log(error, "DELETE GALLERY ERROR");
  }
};
