const mongoose = require("mongoose");

const DonationAlbumSchema = new mongoose.Schema({});

module.exports = mongoose.model("DonationAlbum", DonationAlbumSchema);
