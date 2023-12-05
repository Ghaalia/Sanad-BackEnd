const Organization = require("../../models/Organization");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
require("dotenv").config;

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXP_TIME,
  });

  return token;
};

exports.register = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    req.body.password = await hashedPassword(req.body.password);

    if (req.file) {
      req.body.license = req.file.path;
      req.body.logo = req.file.path;
    }

    const organizationUser = await Organization.create(req.body);

    // const token = generateToken(organizationUser);

    return res
      .status(201)
      .json(
        `Thank you for registering, please await admin approval for access to your account`
      );
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.find();
    return res.status(201).json(organizations);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    await Organization.updateOne(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.user._id);
    res.status(200).json(organization);
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { eventcategoryId } = req.params;
    const eventcategory = await EventCategory.findById(eventcategoryId);
    if (!eventcategory) {
      return res.status(404).json("The category isn't found");
    }
    if (req.file) {
      req.body.event_image = req.file.path;
    }

    req.body.event_category = eventcategoryId;
    if (!req.body.event_category) {
      return res.status(400).json({ message: "Category ID is undefined" });
    }

    const event = await Event.create(req.body);

    eventcategory.events.push(event._id);
    await eventcategory.save();

    await req.organization.updateOne({ $push: { events: event } });

    await event.save();
    res
      .status(201)
      .json(
        `The event: (${event.event_title}) has been added successfully to the categor: (${eventcategory.category_Name})`
      );
  } catch (error) {
    next(error);
  }
};
