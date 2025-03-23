const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const gallery = require("./routes/gallery.js");
const signup = require("./routes/signup.js");
const login = require("./routes/login.js");

const PORT = process.env.PORT ;
const MONGOURL = process.env.MONGODB;

app.listen(PORT, () => {
  console.log("Server connected");
});

mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database connected"));

app.use("/gallery", gallery);
app.use("/jwt", signup);
app.use("/jwt", login);
