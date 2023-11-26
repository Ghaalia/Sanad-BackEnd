const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { NotFound } = require("./middleware/NotFound");
const { ErrorHandler } = require("./middleware/ErrorHandler");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/*
ADD ROUTES HERE
*/

// Not Found Path
app.use(NotFound);

// Error Handler
app.use(ErrorHandler);

connectDB();
app.listen(process.env.port, () => {
  console.log(`The application is running on localhost:${process.env.port}`);
});
