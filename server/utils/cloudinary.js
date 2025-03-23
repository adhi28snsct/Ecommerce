const cloudinarModule = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

const cloudinary = cloudinarModule.v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
module.exports = cloudinary;
