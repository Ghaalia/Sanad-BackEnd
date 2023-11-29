const mongoose = require("mongoose");

const ParticipationSchema = new mongoose.Schema({});

module.exports = mongoose.model("Participation", ParticipationSchema);
