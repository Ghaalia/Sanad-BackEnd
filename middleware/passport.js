const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStartegy = require("passport-local").Strategy;
require("dotenv").config();
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

// const localStrategy = new LocalStartegy(
//   { usernameField: "email", passwordField: "password" },
//   async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return done({ message: "email or or password is wrong" });
//       const checkpw = await bcrypt.compare(password, user.password);
//       if (!checkpw) return done({ message: "email or  password is wrong" });
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }
// );
const localStrategy = new LocalStartegy(
  { usernameField: "userInput", passwordField: "password" },
  async (userInput, password, done) => {
    try {
      // Check if userInput is a valid email or phone number
      const isEmail = isValidEmail(userInput);
      const isPhone_number = isValidPhone_number(userInput);

      if (!isEmail && !isPhone_number) {
        return done({ message: "Invalid email or phone number" });
      }

      // Query the database based on the user input
      const user = await User.findOne({
        $or: [
          { email: isEmail ? userInput : null },
          { phone_number: isPhone_number ? userInput : null },
        ],
      });

      if (!user) {
        return done({
          message: "Email or phone number or or password is wrong",
        });
      }

      const checkpw = await bcrypt.compare(password, user.password);
      if (!checkpw) {
        return done({ message: "Email or phone number or password is wrong" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

function isValidEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

function isValidPhone_number(input) {
  const phoneRegex = /^\d{8}$/;
  return phoneRegex.test(input);
}

const jWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) return done(null, false);
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy, jWTStrategy };
