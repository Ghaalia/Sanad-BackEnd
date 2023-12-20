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
// exports.getParticipationsByEvent = async (req, res, next) => {
//   try {
//     const eventId = req.params.eventId;
//     const participations = await Participation.findOne({
//       event: eventId,
//       user: req.user._id,
//     });

//     res.status(200).json(participations);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getParticipationsByEvent = async (req, res, next) => {
//   try {
//     const eventId = req.params.eventId;
//     const participations = await Participation.findOne({
//       event: eventId,
//       user: req.user._id,
//     }).populate("volunteer_list");

//     res.status(200).json(participations);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getParticipationsByEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const participations = await Event?.volunteer_list?.find();

    console.log(participations);
    console.log(eventId);

    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

exports.getParticipationsById = async (req, res, next) => {
  try {
    const parId = req.body.parId;
    const participations = await Participation.findById(parId);
    if (!participations)
      return res.status(404).json(`Participations Not Found`);
    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

exports.gettheUserid = async (req, res, next) => {
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

    if (!event) {
      return next({ status: 404, message: "Event not found!" });
    }

    const alreadyParticipated = await Participation.findOne({
      user: req.user._id,
      event: event._id,
    });

    if (alreadyParticipated) {
      return next({
        status: 400,
        message: "You can't participate twice in the same event",
      });
    }

    const participation = await Participation.create({
      event: event,
      user: req.user._id,
    });

    await event.updateOne({
      $push: { volunteer_list: participation },
    });

    // Fetch the updated event
    const updatedEvent = await Event.findById(eventId);

    await req.user.updateOne({
      $push: { volunteer_events: participation },
    });

    return res.status(201).json({
      message: "Request sent!",
      event: updatedEvent, // Include the updated event in the response
    });
  } catch (error) {
    next(error);
  }
};

exports.getParticipationsbyId = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const parId = req.body.parId;
    // console.log(parId);

    // Find the participation by ID and populate user and event fields
    const event = await Event.findById(eventId);
    console.log(event);
    const participation = await Participation.findById(parId);
    if (!participation) return res.status(404).json("Participation not found");

    return res.status(200).json(participation);
  } catch (error) {
    next(error);
  }
};

exports.parAttended = async (req, res, next) => {
  try {
    const particepant = await Participation.findById(req.body);
    console.log(particepant);
    if (!particepant) return res.status(404).json("particepant not found");
    await particepant.updateOne({ attended: true });
    res.status(204).json(particepant);
  } catch (error) {
    next(error);
  }
};

// req.body.user = req.user._id;
// const parId = req.params.parId;

// console.log(req.body.user);
// //{ user: req.user._id }
// const participations = await Participation?.find({ _id: parId });
// console.log(participations);
// console.log(participations[0].status);
// if (!participations) return res.status(404).json("participation not found");
// res.status(200).json(participations);
