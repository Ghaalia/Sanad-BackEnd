// const { v4: uuidv4 } = require("uuid");
const DonationImage = require("../../models/DonationImage");

const uploadImages = async (req, res) => {
  //   const uniqueId = uuidv4();
  const imageUrls = req.files.map(
    (file) => `http://localhost:3000/media/${file.filename}`
  );

  //FIND USER & CATEGORY
  let donationFurniture = await DonationImage.findOne({
    user: req.user._id,
    category: "Furniture",
  });
  let donationDevices = await DonationImage.findOne({
    user: req.user._id,
    category: "Devices",
  });
  let donationElectronics = await DonationImage.findOne({
    user: req.user._id,
    category: "Electronics",
  });
  let donationClothes = await DonationImage.findOne({
    user: req.user._id,
    category: "Clothes",
  });

  //CREATE+UPDATE USER & CATEGORY
  if (!donationFurniture) {
    donationFurniture = await DonationImage.create({
      user: req.user._id,
      category: "Furniture",
    });
    await req.user.updateOne({ $push: { donation_album: donationFurniture } });
  }
  if (!donationDevices) {
    donationDevices = await DonationImage.create({
      user: req.user._id,
      category: "Devices",
    });
    await req.user.updateOne({ $push: { donation_album: donationDevices } });
  }
  if (!donationElectronics) {
    donationElectronics = await DonationImage.create({
      user: req.user._id,
      category: "Electronics",
    });
    await req.user.updateOne({
      $push: { donation_album: donationElectronics },
    });
  }
  if (!donationClothes) {
    donationClothes = await DonationImage.create({
      user: req.user._id,
      category: "Clothes",
    });
    await req.user.updateOne({ $push: { donation_album: donationClothes } });
  }

  //FILTER + MAP THE IMAGES
  const furnitureImages = req.files
    .filter((image) => {
      return image.originalname.includes("Furniture");
    })
    .map((image) => {
      return { image: image.path, isSelected: false };
    });

  const devicesImages = req.files
    .filter((image) => {
      return image.originalname.includes("Devices");
    })
    .map((image) => {
      return { image: image.path, isSelected: false };
    });

  const electronicsImages = req.files
    .filter((image) => {
      return image.originalname.includes("Electronics");
    })
    .map((image) => {
      return { image: image.path, isSelected: false };
    });

  const clothesImages = req.files
    .filter((image) => {
      return image.originalname.includes("Clothes");
    })
    .map((image) => {
      return { image: image.path, isSelected: false };
    });

  //SHOW ALL PREV DATA OF IMAGES
  donationFurniture.imageData = [
    ...donationFurniture.imageData,
    ...furnitureImages,
  ];
  await donationFurniture.save();

  donationDevices.imageData = [...donationDevices.imageData, ...devicesImages];
  await donationDevices.save();

  donationElectronics.imageData = [
    ...donationElectronics.imageData,
    ...electronicsImages,
  ];
  await donationElectronics.save();

  donationClothes.imageData = [...donationClothes.imageData, ...clothesImages];
  await donationClothes.save();
};

const getGalleryImages = async (req, res, next) => {
  try {
    const images = await DonationImage.find({ user: req.params.userId });
    console.log(images);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

// const getSelectedUnselectedImages = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const allImageDocs = await DonationImage.find({ user: userId });

//     let selectedImages = [];
//     let unselectedImages = [];

//     allImageDocs.forEach((imageDoc) => {
//       imageDoc.imageData.forEach((image) => {
//         // Assuming `image` is an object with properties `filename` and `isSelected`
//         const imageUrl = imageDoc.getImageUrl(image.filename);
//         if (image.isSelected) {
//           selectedImages.push(imageUrl);
//         } else {
//           unselectedImages.push(imageUrl);
//         }
//       });
//     });

//     res.status(200).json({ selectedImages, unselectedImages });
//   } catch (error) {
//     console.error("Error in getSelectedUnselectedImages: ", error);
//     next(error);
//   }
// };

const getSelectedUnselectedImages = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const allImages = await DonationImage.find({ user: userId });

    const selectedImages = allImages.filter((image) => image.isSelected); // Assuming there's an 'isSelected' field
    const unselectedImages = allImages.filter((image) => !image.isSelected);

    res.status(200).json({
      selectedImages: selectedImages.map((image) => image.url), // Assuming there's a 'url' field
      unselectedImages: unselectedImages.map((image) => image.url),
    });
  } catch (error) {
    next(error);
  }
};

const updateImageSelection = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate isSelected is a Boolean
    let donationFurniture = await DonationImage.findOne({
      user: userId,
      category: "Furniture",
    });
    let donationDevices = await DonationImage.findOne({
      user: userId,
      category: "Devices",
    });
    let donationElectronics = await DonationImage.findOne({
      user: userId,
      category: "Electronics",
    });
    let donationClothes = await DonationImage.findOne({
      user: userId,
      category: "Clothes",
    });
    // console.log(req.body);
    console.log("BEFORE");
    console.log(donationFurniture.imageData);

    const furnitureImages = req.body?.selectedImages
      ?.filter((image) => {
        return image.image.includes("Furniture");
      })
      .map((image) => {
        return { image: image.image, isSelected: true };
      });

    const devicesImages = req.body?.selectedImages
      .filter((image) => {
        return image.image.includes("Devices");
      })
      .map((image) => {
        return { image: image.image, isSelected: true };
      });

    const electronicsImages = req.body?.selectedImages
      .filter((image) => {
        return image.image.includes("Electronics");
      })
      .map((image) => {
        return { image: image.image, isSelected: true };
      });

    const clothesImages = req.body?.selectedImages
      .filter((image) => {
        return image.image.includes("Clothes");
      })
      .map((image) => {
        return { image: image.image, isSelected: true };
      });

    donationFurniture.imageData = donationFurniture.imageData.map((image) => {
      const found = furnitureImages.find(
        (image_) => image_.image == image.image
      );
      if (found) {
        return found;
      } else {
        return image;
      }
    });

    await donationFurniture.save();

    donationDevices.imageData = donationDevices.imageData.map((image) => {
      const found = devicesImages.find((image_) => image_.image == image.image);
      if (found) {
        return found;
      } else {
        return image;
      }
    });
    await donationDevices.save();

    donationElectronics.imageData = donationElectronics.imageData.map(
      (image) => {
        const found = electronicsImages.find(
          (image_) => image_.image == image.image
        );
        if (found) {
          return found;
        } else {
          return image;
        }
      }
    );
    await donationElectronics.save();

    donationClothes.imageData = donationClothes.imageData.map((image) => {
      const found = clothesImages.find((image_) => image_.image == image.image);
      if (found) {
        return found;
      } else {
        return image;
      }
    });
    await donationClothes.save();

    res.status(200).json({ message: "Image selection updated successfully" });
  } catch (error) {
    console.error("Error updating image selection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const updateImageSelection = async (req, res) => {
//   try {
//     const imageId = req.params.imageId;
//     const isSelected = req.body.isSelected; // true or false

//     await DonationImage.findByIdAndUpdate(imageId, { isSelected });

//     res.status(200).json({ message: "Image selection updated successfully" });
//   } catch (error) {
//     console.error("Error updating image selection:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const updateImageSelection = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const { selectedImageIds, unselectedImageIds } = req.body;

//     // Update images as selected
//     await DonationImage.updateMany(
//       { _id: { $in: selectedImageIds }, user: userId },
//       { isSelected: true }
//     );

//     // Update images as unselected
//     await DonationImage.updateMany(
//       { _id: { $in: unselectedImageIds }, user: userId },
//       { isSelected: false }
//     );

//     res.status(200).json({ message: "Image selection updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  uploadImages,
  getGalleryImages,
  getSelectedUnselectedImages,
  updateImageSelection,
};
