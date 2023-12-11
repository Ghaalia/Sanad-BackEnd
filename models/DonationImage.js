const mongoose = require("mongoose");

const DonationImageSchema = new mongoose.Schema({
  category: String,
  imageData: Buffer,
  contentType: String,
  filePath: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("DonationImage", DonationImageSchema);
