const express = require("express");
const { loginuser, userdata } = require("../controller/login");
const router = express.Router();

router.post("/login-user" , loginuser);
router.post("/user-data" , userdata);

module.exports = router;