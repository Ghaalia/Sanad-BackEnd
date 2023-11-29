const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to Database");
  } catch (error) {
    console.log("error trying to connect to the database", error);
  }
};

module.exports = connectDB;
