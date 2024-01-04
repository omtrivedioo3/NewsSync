require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userRouter = require("./routes/user")
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", userRouter.router);



app.listen(process.env.PORT, () => {
  console.log("BE started at port 5000");
});
