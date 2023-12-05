const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { NotFound } = require("./middleware/NotFound");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const passport = require("passport");
const userrouter = require("./Api/user/user.routes");
const OrganizationRouter = require("./api/organization/organization.routes");

const { localStrategy, jWTStrategy } = require("./middleware/passport");
const { localStrategy2, jWTStrategy2 } = require("./middleware/OrgPassport");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jWTStrategy);

passport.use("local2", localStrategy2);
passport.use("jwt2", jWTStrategy2);

/*
ADD ROUTES HERE
*/
app.use("/api", userrouter);
app.use("/api", OrganizationRouter);

// Not Found Path
app.use(NotFound);

// Error Handler
app.use(ErrorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
