// const express = require("express");
// const {
//   createNotification,
//   getNotificationsByUser,
// } = require("./notification.controllers");
// const Device = require("../../models/Device");
// const passport = require("passport");
// const router = express.Router();

// // Create a new notification
// router.post("/notifications", createNotification);

// // Get all notifications for a user
// router.get("/notifications/:userId", getNotificationsByUser);

// router.post(
//   "/register_token",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const user = req.user._id; //extract id from req.user._id
//     const { token } = req.body; //extract token from req.body
//     let device = await Device.findOne({ user }); //tries to find the device for that specific user

//     if (!device) {
//       device = await Device.create({ user, token }); //if it doesn't find the device, it creates a new record with the token
//     }

//     res.send({ message: "Device registered successfully!" });
//   }
// );

// module.exports = router;
