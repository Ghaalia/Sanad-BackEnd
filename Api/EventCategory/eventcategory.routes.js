const express = require("express");
// const passport = require("passport");
const {
  getAllCategories,
  createCategory,
  getCategoryById,
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

categoryrouter.get("/categoryID", getCategoryById);
module.exports = categoryrouter;
