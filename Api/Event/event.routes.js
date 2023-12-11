const express = require("express");
const Event = require("../../models/Event");
const {
  getAllEvents,
  deleteEvent,
  updateEvent,
  getOneEvent,
  // getOrgEvent,
} = require("./event.controllers");
const passport = require("passport");
const upload = require("../../middleware/multer");

const eventrouter = express.Router();

eventrouter.get("/event", getAllEvents);

eventrouter.delete(
  "/event/:eventId",
  passport.authenticate("jwt2", { session: false }),
  deleteEvent
);

eventrouter.put(
  "/events/:eventId",
  passport.authenticate("jwt2", { session: false }),
  upload.single("event_image"),
  updateEvent
);

eventrouter.get(
  "/event/:eventId",
  passport.authenticate("jwt2", { session: false }),
  getOneEvent
);

module.exports = eventrouter;
