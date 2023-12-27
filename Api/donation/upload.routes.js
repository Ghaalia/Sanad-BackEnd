const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
  uploadImages,
  getGalleryImages,
  getSelectedUnselectedImages,
  updateImageSelection,
} = require("./upload.controllers");
const passport = require("passport");

router.post(
  "/image-gallery",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 12),
  uploadImages
);

router.get("/image-gallery/:userId", getGalleryImages);

router.get("/images/selected-unselected/:userId", getSelectedUnselectedImages);

router.post("/update-image-selection/:userId", updateImageSelection);

module.exports = router;
