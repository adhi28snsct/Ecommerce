const express = require("express");
const { userSignup, getuser, deleteuser } = require("../controller/signup");
const router = express.Router();

router.post("/add", userSignup);
router.get("/get",getuser)
router.delete("/:id",deleteuser)

module.exports = router;
