const Event = require("../../models/Event");
const Participation = require("../../models/Participation");
require("dotenv").config;

// Create a new participation
exports.createParticipation = async (req, res, next) => {
  try {
    const { status, user, event, attended, rejection_msg } = req.body;

    const participation = new Participation({
      status,
      user,
      event,
      attended,
      rejection_msg,
    });

    await participation.save();

    res.status(201).json(participation);
  } catch (error) {
    next(error);
  }
};

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

// Get all participations for a specific user
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
exports.registerParticipatforanEvent = async (req, res, next) => {
  try {
    const eventId = req.params.event;
    // if org approved req status  then push participant to volunteer list
    //else rejected send reg msg by org
    //add participant from the body and set the req status to pendeing
    //once the events ends
    //the org will takes the attendance and change attended to true
    //where i change the
  } catch (error) {
    next(error);
  }
};
