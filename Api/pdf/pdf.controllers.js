const PDFDocument = require("pdfkit");
const Image = require("../../models/DonationImage");
const uniqueId = require("uniqid"); // npm install uniqid
const links = {};

const createPDFWithImages = async (req, res) => {
  try {
    const images = await Image.find({}); // Retrieve images from MongoDB
    const doc = new PDFDocument();
    let x = 0,
      y = 0;
    let imageCounter = 1;

    images.forEach((image) => {
      if (x + 110 > doc.page.width) {
        // Check if next image will exceed page width
        y += 200; // Move to next row
        x = 0;
      }
      doc.image(image.imageData, x, y, { fit: [100, 100] });
      doc.text(imageCounter++, x, y + 110); // Number below the image
      x += 110; // Move to next column
    });

    doc.pipe(res); // Stream the PDF back to the client
    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const generateLink = (pdfBuffer) => {
  const id = uniqueId();
  links[id] = pdfBuffer;
  return `http://yourserver.com/pdf/${id}`;
};
