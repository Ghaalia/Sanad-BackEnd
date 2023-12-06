const express = require("express");
const Event = require("../../models/Event");
const { getAllEvents, deleteEvent } = require("./event.controllers");
const passport = require("passport");

const eventrouter = express.Router();

eventrouter.get("/allevents", getAllEvents);

eventrouter.delete(
  "/event/:eventId",
  // passport.authenticate("jwt", { session: false }),
  deleteEvent
);

module.exports = eventrouter;
