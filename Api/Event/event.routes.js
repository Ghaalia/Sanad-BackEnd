const express = require("express");
const Event = require("../../models/Event");
const {
  getAllEvents,
  deleteEvent,
  // getOrgEvent,
} = require("./event.controllers");
const passport = require("passport");

const eventrouter = express.Router();

eventrouter.get("/event", getAllEvents);

eventrouter.delete(
  "/event/:eventId",
  // passport.authenticate("jwt", { session: false }),
  deleteEvent
);

// eventrouter.get(
//   "/org/myevents",
//   passport.authenticate("jwt2", { session: false }),
//   getOrgEvent
// );

module.exports = eventrouter;
