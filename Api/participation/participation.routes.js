const express = require("express");

const {
  getParticipationsByEvent,
  getParticipationsByUser,
  userApproveById,
  userRejectById,
} = require("./participation.controllers");
const participationrouter = express.Router();

// Create a new participation
// participationrouter.post("/participation", createParticipation);

// Get all participations for a specific event
participationrouter.get(
  "/participation/event/:eventId",
  getParticipationsByEvent
);

// Get all participations for a specific user
participationrouter.get("/participation/user/:userId", getParticipationsByUser);

participationrouter.put(`/participation/user/approve`, userApproveById);
participationrouter.put(`/participation/user/reject`, userRejectById);

module.exports = participationrouter;
