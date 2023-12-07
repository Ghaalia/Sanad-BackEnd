const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Notification", NotificationSchema);
