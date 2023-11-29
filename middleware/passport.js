const Volunteer = require("../models/Volunteer");
const bcrypt = require("bcrypt");
const LocalStartegy = require("passport-local").Strategy;
require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStartegy(
  { emailField: "email" },
  async (email, password, done) => {
    try {
      const volunteer = await Volunteer.findOne({ email: email });
      if (!volunteer) return done({ message: "email or  password is wrong" });
      const checkpw = await bcrypt.compare(password, volunteer.password);
      if (!checkpw) return done({ message: "email or  password is wrong" });
      return done(null, volunteer);
    } catch (error) {
      done(error);
    }
  }
);

const jWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) return done(null, false);
      const volunteer = await Volunteer.findById(payload.id);
      if (!volunteer) return done(null, false);
      return done(null, volunteer);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jWTStrategy };
