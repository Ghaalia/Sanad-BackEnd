const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
  status: { type: String, default: "Pending" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  attended: { type: Boolean, default: false },

  rejection_msg: String,
});

const Participation = mongoose.model("participation", participationSchema);

module.exports = Participation;
