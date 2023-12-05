const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  organization: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organization" }],
});

module.exports = mongoose.model("Admin", AdminSchema);
