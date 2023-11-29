const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { NotFound } = require("./middleware/NotFound");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const passport = require("passport");
const volunteerrouter = require("./Api/Volunteer/volunteer.routes");
const { localStrategy, jWTStrategy } = require("./middleware/passport");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jWTStrategy);

/*
ADD ROUTES HERE
*/
app.use("/api", volunteerrouter);

// Not Found Path
app.use(NotFound);

// Error Handler
app.use(ErrorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
