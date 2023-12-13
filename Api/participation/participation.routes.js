const express = require("express");

const {
  getParticipationsByEvent,
  getParticipationsByUser,
  userApproveById,
  userRejectById,
  requestParticipation,
} = require("./participation.controllers");
const passport = require("passport");
const participationrouter = express.Router();

// Create a new participation
// participationrouter.post("/participation", createParticipation);

// Get all participations for a specific event
participationrouter.get(
  "/participation/event/:eventId",
  passport.authenticate("jwt", { session: false }),
  getParticipationsByEvent
);

// Get all participations for a specific user
participationrouter.get("/participation/user/:userId", getParticipationsByUser);
participationrouter.put(`/participation/user/approve`, userApproveById);
participationrouter.put(`/participation/user/reject`, userRejectById);

participationrouter.post(
  "/participation/:eventId",
  passport.authenticate("jwt", { session: false }),
  requestParticipation
);

module.exports = participationrouter;
