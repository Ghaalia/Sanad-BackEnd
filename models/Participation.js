const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  attended: Boolean,
  rejection_msg: String,
});

const Participation = mongoose.model("Participation", participationSchema);

module.exports = Participation;
