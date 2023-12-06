const Event = require("../../models/Event");
const EventCategory = require("../../models/EventCategory");
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
    // if (
    //   !event.organization ||
    //   !event.organization.equals(req.organization._id)
    // ) {
    //   return res
    //     .status(403)
    //     .json(
    //       `You dont have the authority to delete this event name:( ${event.event_title}) to make this action`
    //     );
    //}
    console.log("hala www");
    const catID = event.event_category;
    await EventCategory.updateOne(
      { _id: catID },
      { $pull: { events: event._id } }
    );
    await event.deleteOne();

    res.status(200).json("Successfully deleted");

    //const deletedevent = await EventCategory.findById(eventId);

    //i have to delete the event form categoryevents .events array
  } catch (error) {
    console.log("hi");
    next(error);
  }
};

exports.getUserEvent = async (req, res, next) => {
  try {
    const recipe = await Recipe.find({ user: req.user._id });
    if (!recipe) return res.status(404).json("Recipe not found");
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};
