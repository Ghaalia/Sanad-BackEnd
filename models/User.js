const mongoose = require("mongoose");
const { image } = require("pdfkit");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: String },
  civil_id: { type: String },
  dob: { type: String },
  phone_number: { type: Number, required: true },
  image: { type: String },
  // default: require("../media/user/profileimg.png")
  volunteer_events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participation",
    },
  ],
  skills: { type: String },
  donation_album: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationAlbum",
    },
  ],
  volunteer_record: { type: Number },
  generated_link: { type: Number },
  volunteer_points: { type: Number },
  isBlocked: { type: String, default: "false" },
});

module.exports = mongoose.model("User", UserSchema);
