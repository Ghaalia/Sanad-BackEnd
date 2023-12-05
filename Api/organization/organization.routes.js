const express = require("express");
const passport = require("passport");
const OrganizationRouter = express.Router();
const {
  register,
  signin,
  getAllOrganizations,
  updateProfile,
  getProfile,
} = require("./organization.controllers");
const upload = require("../../middleware/multer");

OrganizationRouter.post("/org/register", upload.single("logo"), register);

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

module.exports = OrganizationRouter;
