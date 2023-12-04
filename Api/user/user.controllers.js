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
