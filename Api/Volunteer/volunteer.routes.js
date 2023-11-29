const express = require("express");
const Volunteer = require("../../models/Volunteer");
const {
  register,
  signin,
  getAllVolunteer,
} = require("./volunteer.controllers");
const passport = require("passport");

const volunteerrouter = express.Router();

volunteerrouter.post("/register", register);

volunteerrouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

volunteerrouter.get("/allvolunteers", getAllVolunteer);

module.exports = volunteerrouter;
