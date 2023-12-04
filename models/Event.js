const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_title: { type: String, required: true },
  event_image: {
    type: String,
    default:
      "https://www.sender.net/wp-content/uploads/2021/06/volunteer_newsletter_ideas_examples.png",
  },
  event_category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event_category",
    },
  ],
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization" },
  volunteer_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "participation",
    },
  ],
  event_date: { type: Date, required: true },
  event_start_time: { type: Date, required: true },
  event_end_time: { type: Date, required: true },
  no_of_volunteer: { type: Number, required: true },
  description: { type: String, required: true },
  registration_Condition: { type: String, required: true },
  event_address: { type: String, required: true },
  location_coordinates: { type: JSON },
  event_status: { type: String, required: true },
});

module.exports = mongoose.model("event", EventSchema);