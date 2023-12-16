const Event = require("../../models/Event");
const Participation = require("../../models/Participation");
const { use } = require("./participation.routes");
require("dotenv").config;

// // Create a new participation
// exports.createParticipation = async (req, res, next) => {
//   try {
//     const { status, user, event, attended, rejection_msg } = req.body;

//     const participation = new Participation({
//       status,
//       user,
//       event,
//       attended,
//       rejection_msg,
//     });

//     await participation.save();

//     res.status(201).json(participation);
//   } catch (error) {
//     next(error);
//   }
// };

// Get all participations for a specific event
exports.getParticipationsByEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participations = await Participation.findOne({
      event: eventId,
      user: req.user._id,
    });

    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

// Get all participations for a specific user working
exports.getParticipationsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const participations = await Participation.find({ user: userId }).populate(
      "user"
    );

    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

exports.userApproveById = async (req, res, next) => {
  try {
    const eventID = req.params.eventID; // Assuming the ID is in the URL parameters
    const userId = await User.findById(req.body);
    if (!userId) return res.status(404).json("user not found");
    await userId.participations.updateOne({ isAccepted: "Accepted" });
    res.status(204).end();

    const updatedParticipation = await Participation.findByIdAndUpdate(
      participationId,
      { status: "Accepted" },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedParticipation) {
      return res.status(404).json("Participation not found");
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.userRejectById = async (req, res, next) => {
  try {
    const participationId = req.params.userId; // Assuming the ID is in the URL parameters
    const updatedParticipation = await Participation.findByIdAndUpdate(
      participationId,
      { status: "Rejected" },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedParticipation) {
      return res.status(404).json("Participation not found");
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.requestParticipation = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return next({ status: 404, message: "event not found!" });
    const alreadyParticipated = await Participation.findOne({
      user: req.user._id,
      event: event._id,
    });
    if (alreadyParticipated)
      return next({
        status: 400,
        message: "you can't participate twice in the same event",
      });
    const participation = await Participation.create({
      event: event,
      user: req.user._id,
    });

    await event.updateOne({
      $push: { vvolunteer_list: participation },
    });

    await req.user.updateOne({ $push: { volunteer_events: participation } });
    return res.status(201).json({
      message: "Request sent!",
    });
  } catch (error) {
    next(error);
  }
};
