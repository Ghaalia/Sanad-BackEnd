const express = require("express");
const User = require("../../models/User");
const { register, signin, getAllUsers } = require("./user.controllers");
const passport = require("passport");
const upload = require("../../middlewares/multer");

const userrouter = express.Router();

userrouter.post("/register", upload.single("image"), register);

userrouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

userrouter.get("/allusers", getAllUsers);

module.exports = userrouter;
