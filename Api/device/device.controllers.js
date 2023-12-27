const Device = require("../../models/Device");

exports.registerDevice = async (req, res, next) => {
  try {
    const { token, userId } = req.body;

    console.log(token);
    let device = await Device.findOne({ token: token.data });

    if (!device) {
      device = new Device({ token: token.data, user: userId });
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
