const Organization = require("../../models/Organization");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
const EventCategory = require("../../models/EventCategory");
require("dotenv").config;

const hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
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

    if (req.files) {
      console.log(req.files);
      req.body.license = req.files[0].path;
      req.body.logo = req.files[1].path;
      // req.body.logo = req.file.path;
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

exports.signin = async (req, res, next) => {
  try {
    const token = await generateToken(req.user);
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

exports.OrgApproveById = async (req, res, next) => {
  try {
    const orgId = await Organization.findById(req.body);
    console.log(orgId);
    if (!orgId) return res.status(404).json("Organization not found");
    await orgId.updateOne({ isAccepted: "Accepted" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.OrgRejectById = async (req, res, next) => {
  try {
    const orgId = await Organization.findById(req.body);
    console.log(orgId);
    if (!orgId) return res.status(404).json("Organization not found");
    await orgId.updateOne({ isAccepted: "Rejected" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// exports.getOrganizationsById = async (req, res, next) => {
//   try {
//     const organization = await Organization.findById(req._id);
//     if (organization) return res.status(201).json(organization);
//     return res.status(404).json("Organization not found");
//   } catch (error) {
//     next(error);
//   }
// };

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
    const foundOrganization = await Organization.findById(req.user._id);
    res.status(200).json(foundOrganization);
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { body: data, user, file } = req;

    // Create a new event
    if (file) {
      data.event_image = file.path;
    }
    data.user = user._id; // Set the user ID (assuming user is logged in and their ID is available)
    console.log(data);
    console.log(Array.isArray(data.event_category));
    if (!Array.isArray(data.event_category)) {
      data.event_category = [data.event_category];
    }
    const newEvent = await Event.create(data);

    // Assuming event_category is now an array of IDs in the request body
    const categoryIds = req.body.event_category;
    for (const categoryId of categoryIds) {
      const category = await EventCategory.findById(categoryId);
      if (category) {
        category.events.push(newEvent._id);
        await category.save();
      }
    }

    // Update the user's events (assuming there's a relationship between users and events)
    await user.updateOne({ $push: { events: newEvent._id } });

    // Send response
    res.status(201).json({
      message: `The event '${newEvent.event_title}' has been added successfully`,
      event: newEvent,
    });
  } catch (error) {
    // Error handling
    next(error);
  }
};

// exports.createEvent = async (req, res, next) => {
//   const { body: data, user, file, params } = req;
//   try {
//     const { eventcategoryId } = params;
//     data.event_category = eventcategoryId;
//     if (!data.event_category) {
//       // const error = new Error();
//       // error.status = 400;
//       // error.message = "Category ID not send."
//       // return next(error)
//       return res.status(400).json({ message: "Category ID not available." });
//     }
//     const foundEventCategory = await EventCategory.findById(eventcategoryId);
//     if (!foundEventCategory) {
//       // const error = new Error();
//       // error.status = 404;
//       // error.message = "Category not found."
//       // return next(error)
//       return res.status(404).json("The category isn't found");
//     }
//     if (file) {
//       data.event_image = file.path;
//     }
//     data.user = user._id;
//     const newEvent = await Event.create(data);
//     foundEventCategory?.events?.push(newEvent._id);
//     await foundEventCategory.save();
//     await user.updateOne({ $push: { events: newEvent } });
//     await newEvent?.updateOne({ organization: user._id });
//     res
//       .status(201)
//       .json(
//         `The event: (${newEvent.event_title}) has been added successfully to the categor: (${foundEventCategory.category_name})`
//       );
//     //
//     //here i have to update the org . events array
//   } catch (error) {
//     return next(error);
//   }
// };

exports.getOrgEvent = async (req, res, next) => {
  // try {
  //   const foundOrganizationE = await Organization.findById(req.user._id);

  //   const event = await Event.findById({Event.organization: foundOrganizationE._id});

  //   if (!event) return res.status(404).json("Event not found");
  //   res.status(200).json(event);
  // } catch (error) {
  //   next(error);
  // }

  try {
    console.log(req.user._id);
    const event = await Event.find({ organization: req.user._id });
    if (!event) return res.status(404).json("events not found");
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

//handle particepant singing up en specific event

//eventid

//handle particepant attendence once the
