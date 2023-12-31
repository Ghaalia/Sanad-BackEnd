const express = require("express");
const passport = require("passport");
const OrganizationRouter = express.Router();
const {
  register,
  signin,
  getAllOrganizations,
  updateProfile,
  getProfile,
  createEvent,
  OrgApproveById,
  OrgRejectById,
  handelParReqsforAnEvent,
  getOrgEvent,
  getOrganizationsById,
} = require("./organization.controllers");
const upload = require("../../middleware/multer");
const Organization = require("../../models/Organization");

OrganizationRouter.post("/org/register", upload.array("files"), register);

OrganizationRouter.post(
  "/org/signin",
  passport.authenticate("local2", { session: false }),
  signin
); // Login

OrganizationRouter.get("/org/allOrganizations", getAllOrganizations);

OrganizationRouter.put(
  "/org/update-my-profile",
  passport.authenticate("jwt2", { session: false }),
  updateProfile
);

OrganizationRouter.get(
  "/org/get-my-profile",
  passport.authenticate("jwt2", { session: false }),
  getProfile
);

OrganizationRouter.post(
  "/org/create-event",
  upload.single("event_image"),
  passport.authenticate("jwt2", { session: false }),
  createEvent
);

OrganizationRouter.put(`/org/approve`, OrgApproveById);
OrganizationRouter.put(`/org/reject`, OrgRejectById);

OrganizationRouter.get(
  `/org/myevents`,
  passport.authenticate("jwt2", { session: false }),
  getOrgEvent
);

OrganizationRouter.get(
  `/org/:OrgId`,
  passport.authenticate("jwt2", { session: false }),
  getOrganizationsById
);

OrganizationRouter.get(
  `/org/eventParticipationReqHandler`,
  passport.authenticate("jwt2", { session: false }),
  handelParReqsforAnEvent
);

module.exports = OrganizationRouter;
