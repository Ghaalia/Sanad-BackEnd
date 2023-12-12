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
    const participations = await Participation.find({ event: eventId });

    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

// Get all participations for a specific user working
exports.getParticipationsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const participations = await Participation.find({ user: userId });

    res.status(200).json(participations);
  } catch (error) {
    next(error);
  }
};

// register participant for a sipecific event by event id

// exports.userApproveById = async (req, res, next) => {
//   try {
//     const userId = await Participation.findById(req.body);
//     console.log(userId);
//     const theparticipation = await Participation.find({ user: userId });

//     if (!theparticipation)
//       return res.status(404).json("participation  not found");
//     await Participation.findByIdAndUpdate(req.params.userId);
//     //await userId.updateOne({ status: "Accepted" });
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

// exports.userRejectById = async (req, res, next) => {
//   try {
//     const userId = await Participation.findById(req.body);
//     console.log(userId);
//     if (!userId) return res.status(404).json("user not found");
//     await userId.updateOne({ status: "Rejected" });
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

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
