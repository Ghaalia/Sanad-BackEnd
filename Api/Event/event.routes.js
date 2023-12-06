const express = require("express");
const Event = require("../../models/Event");
const {
  getAllEvents,
  deleteEvent,
  getOrgEvent,
} = require("./event.controllers");
const passport = require("passport");

const eventrouter = express.Router();

eventrouter.get("/allevents", getAllEvents);

eventrouter.delete(
  "/event/:eventId",
  // passport.authenticate("jwt", { session: false }),
  deleteEvent
);

// router.get(
//   "/org/myevents",
//   //  passport.authenticate("jwt", { session: false }),
//   getOrgEvent
// );

module.exports = eventrouter;
