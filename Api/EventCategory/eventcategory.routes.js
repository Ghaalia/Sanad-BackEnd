const express = require("express");
// const passport = require("passport");
const {
  getAllCategories,
  createCategory,
} = require("./eventcategory.controllers");

const categoryrouter = express.Router();

categoryrouter.get(
  "/categories",
  //   passport.authenticate("jwt", { session: false }),
  getAllCategories
);
categoryrouter.post(
  "/categories",
  //   passport.authenticate("jwt", { session: false }),
  createCategory
);

module.exports = categoryrouter;
