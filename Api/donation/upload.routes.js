const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const { uploadImages } = require("./upload.controllers");
const passport = require("passport");

router.post(
  "/image-gallery",
  //   passport.authenticate("jwt2", { session: false }),
  upload.array("images", 12),
  uploadImages
);

module.exports = router;
