const Event = require("../../models/Event");
require("dotenv").config;

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate({
        path: "event_category",
        select: "category_Name",
      })
      .populate("organization");
    return res.status(201).json(events);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    console.log("hi");
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json("The event isn't found");
    }
    if (
      !event.organization ||
      !event.organization.equals(req.organization._id)
    ) {
      return res
        .status(403)
        .json(
          `You dont have the authority to delete this event name:( ${event.event_title}) to make this action`
        );
    }
    await event.deleteOne();
    res.status(200).json("Successfully deleted");
  } catch (error) {
    next(error);
  }
};
