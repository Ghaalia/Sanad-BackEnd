const EventCategory = require("../../models/EventCategory");
const Organization = require("../../models/Organization");
const Event = require("../../models/Event");

exports.getAllCategories = async (req, res, next) => {
  try {
    // req.body.user = req.user._id;
    const categories = await EventCategory.find();
    // .populate({
    //   path: "events",
    //   populate: {
    //     path: "organization", //field name
    //     model: "Organization", // Replace with your Organization model schema name
    //     select: "org_name", // Assuming 'name' is the field you want to show
    //   },
    // });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    // req.body.user = req.user._id;

    //  if (!req.user.isAdmin) {
    // return next({
    //    message: `This account doesn't have the permission to create a new category`,
    //    });
    //  }

    const eventcategory = await EventCategory.findOne({
      category_name: req.body.category_name,
    });
    if (eventcategory) {
      return res
        .status(200)
        .json(
          `A category with the same name (${req.body.category_name}) had been created before you can't add a new one with same name`
        );
    }

    await EventCategory.create(req.body);
    return res
      .status(201)
      .json({ message: ` (${req.body.category_name}) has been created` });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await EventCategory.findbyId(req.body);
    if (!category) return res.status(404).json({ message: `Not found ` });

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
