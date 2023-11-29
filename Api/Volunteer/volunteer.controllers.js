const Volunteer = require("../../models/Volunteer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config;

const hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (volunteer) => {
  const payload = {
    id: volunteer._id,
    email: volunteer.email,
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
    const newVolunteer = await Volunteer.create(req.body);
    const token = generateToken(newVolunteer);
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

exports.getAllVolunteer = async (req, res) => {
  const volunteers = await Volunteer.find();
  return res.status(201).json(volunteers);
};
