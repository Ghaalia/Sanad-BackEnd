const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStartegy = require("passport-local").Strategy;
require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStartegy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done({ message: "email or or password is wrong" });
      const checkpw = await bcrypt.compare(password, user.password);
      if (!checkpw) return done({ message: "email or  password is wrong" });
      return done(null, user);
    } catch (error) {
      return done(error);
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
      const user = await User.findById(payload.id);
      console.log(payload);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy, jWTStrategy };
