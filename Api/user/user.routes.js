const express = require("express");
const User = require("../../models/User");
const {
  register,
  signin,
  getAllUsers,
  deleteUser,
  updateUser,
  getMyProfile,
  userBlockById,
  userUnBlockedById,
} = require("./user.controllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const userrouter = express.Router();

userrouter.post("/user/register", upload.single("image"), register);

userrouter.post(
  "/user/signin",
  passport.authenticate("local", { session: false }),
  signin
);

userrouter.get("/user/allusers", getAllUsers);

userrouter.put(
  "/user/updateuser",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateUser
);

userrouter.delete(
  "/user/deleteuser",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

userrouter.get(
  "/user/userprofile",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);

userrouter.put(`/user/Blocked`, userBlockById);
userrouter.put(`/user/UnBlocked`, userUnBlockedById);

module.exports = userrouter;
