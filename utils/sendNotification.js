const { Expo } = require("expo-server-sdk");
const Device = require("../models/Device");
const Notification = require("../models/Notification");
const expo = new Expo();

exports.sendNotification = async ({ title, description, userId, tokens }) => {
  const notification = new Notification({
    title,
    description,
    user: userId,
  });

  await notification.save();

  // Fetch the devices associated with the user
  const devices = await Device.find({ user: userId });

  let messages = [];
  if (tokens)
    messages.push({
      to: tokens[0],
      sound: "default",
      body: "description",
      data: { withSome: "Hi Moodhy" },
    }); // Customize the data payload as needed

  for (let device of devices) {
    if (!Expo.isExpoPushToken(device.token)) {
      console.error(
        `Push token ${device.token} is not a valid Expo push token`
      );
      continue;
    }
    console.log(device);
    // Construct the message payload
    messages.push({
      to: device.token,
      sound: "default",
      body: description,
      data: { withSome: "data" }, // Customize the data payload as needed
    });
  }
  console.log(messages);
  // Split messages into chunks and send them
  let tickets = [];
  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
      console.log("sending...", ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  return notification;
};
