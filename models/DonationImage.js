const mongoose = require("mongoose");

const DonationImageSchema = new mongoose.Schema({
  category: String,
  imageData: [String],
  isSelected: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

DonationImageSchema.methods.getImageUrl = function (imageFilename) {
  return `http://localhost:8000/media/${imageFilename}`;
};

module.exports = mongoose.model("DonationImage", DonationImageSchema);
