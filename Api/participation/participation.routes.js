const express = require("express");

const {
  getParticipationsByEvent,
  getParticipationsByUser,
  userApproveById,
  userRejectById,
  requestParticipation,
  getParticipationsbyId,
  getParticipationsById,
  parApproveById,
  parRejectById,
  parAttended,
} = require("./participation.controllers");
const passport = require("passport");
const participationrouter = express.Router();

// Create a new participation
// participationrouter.post("/participation", createParticipation);

// Get all participations for a specific event
// participationrouter.get(
//   "/participation/event/:eventId",
//   passport.authenticate("jwt", { session: false }),
//   getParticipationsByEvent
// );

participationrouter.put(
  `/particepant/approve`,
  passport.authenticate("jwt2", { session: false }),
  parApproveById
);
participationrouter.put(
  `/particepant/reject`,
  passport.authenticate("jwt2", { session: false }),
  parRejectById
);

participationrouter.put(
  `/particepant/attended`,
  passport.authenticate("jwt2", { session: false }),
  parAttended
);

participationrouter.get(
  "/participation/event/:eventId",
  getParticipationsByEvent
);

participationrouter.get(
  `/current_event_details/:eventId`,
  passport.authenticate("jwt2", { session: false }),
  getParticipationsbyId
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

participationrouter.get(
  `/current_event_details/:eventId`,
  getParticipationsById
);

module.exports = participationrouter;
