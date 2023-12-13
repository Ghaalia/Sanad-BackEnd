const { v4: uuidv4 } = require("uuid");

const uploadImages = (req, res) => {
  const uniqueId = uuidv4();
  const imageUrls = req.files.map(
    (file) => `http://localhost:3000/media/${file.filename}`
  );
  res.send({ link: `http://localhost:3000/image-gallery/${uniqueId}` });
};

module.exports = {
  uploadImages,
};
