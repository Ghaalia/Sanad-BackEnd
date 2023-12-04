const mongoose = require("mongoose");

const EventCategorySchema = new mongoose.Schema({
  category_Name: { type: String, required: true },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
});

module.exports = mongoose.model("eventCategory", EventCategorySchema);
