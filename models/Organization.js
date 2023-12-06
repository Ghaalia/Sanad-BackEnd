const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  org_name: String,
  password: String,
  address: String,
  email: String,
  phone_number: Number,
  license: String,
  logo: String,
  isAccepted: Boolean,
  isAdmin: Boolean,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  //   location_coordinates: { type: "Point", coordinates: [ 40, 5 ] },
  location_coordinates: String,
});

module.exports = mongoose.model("Organization", OrganizationSchema);
