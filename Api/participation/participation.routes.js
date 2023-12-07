const express = require("express");
const router = express.Router();
const participationController = require("../participation/participation.controllers");

// Create a new participation
router.post("/participation", participationController.createParticipation);

// Get all participations for a specific event
router.get(
  "/participation/event/:eventId",
  participationController.getParticipationsByEvent
);

// Get all participations for a specific user
router.get(
  "/participation/user/:userId",
  participationController.getParticipationsByUser
);

module.exports = router;
