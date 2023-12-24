const Event = require("../../models/Event");
const EventCategory = require("../../models/EventCategory");

require("dotenv").config;

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate("organization")
      .populate("event_category", "category_name")
      .populate("volunteer_list", "Participation");
    // .populate({
    //   path: "eventCategory",
    //   select: "-_id category_name",
    // });
    // .populate({
    //   path: "organization",
    //   select: "-_id name",
    // })
    // .populate({
    //   path: "eventCategory",
    //   select: "-_id category_name",
    // });

    return res.json(events);
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

exports.updateEvent = async (req, res, next) => {
  // const { body: data, user, file, params } = req;
  try {
    const { eventId } = req.params;
    const events = await req.user.events;
    const foundevent = await Event?.findById(eventId);
    console.log("hi category");
    console.log(foundevent.event_category);
    console.log("hi title");
    console.log(foundevent.event_title);

    if (!foundevent) {
      return res.status(404).json("The event isn't found");
    }

    if (
      !foundevent.organization ||
      !foundevent.organization.equals(req.user._id)
    ) {
      return res
        .status(403)
        .json(
          `You must be the creator of this event name:( ${foundevent.event_title}) to make this action: update it to: (${req.body.event_category})`
        );
    }
    if (req.file) {
      req.body.event_image = req.file.path;
    }

    await foundevent?.updateOne(req.body);
    res.status(200).json("Updated Successfully");
  } catch (error) {
    next(error);
  }
};

exports.getOneEvent = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId)({
      path: "volunteer_list",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!event) {
      return res.status(404).json("The event isn't found");
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// exports.getParReqEvent = async (req, res, next) => {
//   try {

// const { eventId } = req.params;

// const parReq = await Event.find();
// const event = await Event.findById(parId);
// if (!event) return next({ status: 404, message: "event not found!" });
// const alreadyParticipated = await Participation.findOne({
//   user: req.user._id,
//   event: event._id,
// });

// return res.json(parReqs);
// } catch (err) {
//   next(err);
// }
// };
