const Device = require("../../models/Device");
const Notification = require("../../models/Notification");
const { Expo } = require("expo-server-sdk");
const User = require("../../models/User");
const { sendNotification } = require("../../utils/sendNotification");
const expo = new Expo();

// Create a new notification
exports.createNotification = async (req, res, next) => {
  try {
    const { title, description, userId, tokens } = req.body;

    // Create and save the notification in the database
    const notification = await sendNotification({
      title,
      description,
      userId,
      tokens,
    });
    res.status(201).json({ success: true, notification });
  } catch (error) {
    next(error);
  }
};

// Get all notifications for one user
exports.getNotificationsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ user: userId });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

// exports.getNotificationsByUser = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId).populate("notifications");
//     const notifications = user.notifications; // Get the populated notifications array

//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     next(error);
//   }
// };
