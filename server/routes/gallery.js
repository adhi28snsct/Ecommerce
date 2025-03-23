const express = require("express");
const {
  addGallery,
  getGallery,
  deleteGallery,
} = require("../controller/gallery");
const router = express.Router();

router.post("/post", addGallery);
router.get("/get", getGallery);
router.delete("/:id", deleteGallery);

module.exports = router;
