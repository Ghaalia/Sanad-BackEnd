const Organization = require("../models/Organization");
const bcrypt = require("bcrypt");
const LocalStartegy = require("passport-local").Strategy;
require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy2 = new LocalStartegy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await Organization.findOne({ email: email });
      if (!user) return done({ message: "Email/Password is wrong" });
      const checkpw = await bcrypt.compare(password, user.password);
      if (!checkpw) return done({ message: "Email or  Password is wrong" });

      if (!user.isAccepted)
        return done({ message: "Account is waiting for approve" });
      return done(null, Organization);
    } catch (error) {
      done(error);
    }
  }
);

const jWTStrategy2 = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) return done(null, false);
      const user = await Organization.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy2, jWTStrategy2 };
