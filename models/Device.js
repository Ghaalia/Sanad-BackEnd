const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  token: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Device", DeviceSchema);
