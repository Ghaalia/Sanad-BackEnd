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
  getOneOrganization,
  getOrganizationsById,
  approveOrg,
} = require("./organization.controllers");
const upload = require("../../middleware/multer");

OrganizationRouter.post("/org/register", upload.single("logo"), register);

OrganizationRouter.post(
  "/org/signin",

  passport.authenticate("local2", { session: false }),

  signin
); // Login

OrganizationRouter.get("/org/allOrganizations", getAllOrganizations);
// OrganizationRouter.get("/org/:orgId", getOrganizationsById);

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
  "/org/event/:eventcategoryId",
  passport.authenticate("jwt2", { session: false }),
  createEvent
);
module.exports = OrganizationRouter;
