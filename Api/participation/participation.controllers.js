const Participation = require("../../models/Participation");

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
