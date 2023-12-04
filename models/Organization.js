const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  username: String,
  password: String,
  address: String,
  email: String,
  phone_number: Number,
  license: String,
  logo: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  //   location_coordinates: { type: "Point", coordinates: [ 40, 5 ] },
  location_coordinates: String,
});

module.exports = mongoose.model("Organization", OrganizationSchema);
