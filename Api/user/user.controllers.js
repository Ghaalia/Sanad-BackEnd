const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config;

const hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24hr",
  });
};

exports.register = async (req, res, next) => {
  try {
    const mypassword = await hashedPassword(req.body.password);
    req.body.password = mypassword;
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(201).json(users);
};

///// UPDATE USER
exports.updateUser = async (req, res) => {
  const userId = req.user._id;
  const updatedUserData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

///// DELETE USER
exports.deleteUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json("The user doesn's exist");
    }
    res.status(200).json("Successfully deleted");
  } catch (error) {
    next(error);
  }
};

//// GETPROFILE

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
