const Device = require("../../models/Device");

exports.registerDevice = async (req, res, next) => {
  try {
    const { token, userId } = req.body;
    let device = await Device.findOne({ token });

    if (!device) {
      device = new Device({ token, user: userId });
      await device.save();
    }

    if (userId) {
      device.user = userId;
      await device.save();
    } //

    res.send({ message: "Device registered successfully!" });
  } catch (error) {
    next(error);
  }
};
