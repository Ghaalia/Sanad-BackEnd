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
      ref: "EventCategory",
    },
  ],
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  volunteer_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participation",
    },
  ],
  event_start_date: {
    type: String,
    //  required: true
  },
  event_end_date: {
    type: String,
    //  required: true
  },
  event_start_time: {
    type: String,
    // required: true
  },
  event_end_time: {
    type: String,
    // required: true
  },
  no_of_volunteer: {
    type: Number,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  registration_Condition: {
    type: String,
    // required: true
  },
  event_address: {
    type: String,
    // required: true
  },
  location_coordinates: { type: JSON },
  event_status: {
    type: String,
    // required: true
  },
  isPosted: { type: String },
});

module.exports = mongoose.model("Event", EventSchema);
