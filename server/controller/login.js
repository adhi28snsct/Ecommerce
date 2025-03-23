const { userSignup } = require("../model/signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const jwtcode = process.env.JWT_SECRET;

exports.loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const olduser = await userSignup.findOne({ email });
    if (!olduser) {
      return res.send({ status: "error", error: "User not found" });
    }
    if (await bcrypt.compare(password, olduser.password)) {
      const token = jwt.sign({ email: olduser.email }, jwtcode);
      return res.send({ status: "ok", data: token });
    }
  } catch (error) {
    res.send({ status: "error", error: "invalid password" });
    console.log("invalid password");
  }
};

exports.userdata = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, jwtcode, (err, res) => {
      if (err) {
        return "Token-expired";
      }
      return res;
    });
    if (user == "Token-expired") {
     return res.send({ status: "error", data: "Token-expired" });
    }
    await userSignup
      .findone({ email: user.email })
      .then((data) => res.send({ status: "ok", data: data }));
  } catch (error) {
    res.send({ status: "error", error: "invalid password" });
    console.log("invalid password");

  }
};
