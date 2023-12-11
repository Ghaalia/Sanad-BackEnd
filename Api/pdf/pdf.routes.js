const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.array("photos"), async (req, res) => {
  const category = req.body.category;
  // Process the uploaded files here
  // You can store the files along with their categories in the database
});

router.get("/pdf/:id", (req, res) => {
  const pdfBuffer = links[req.params.id];
  if (pdfBuffer) {
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } else {
    res.status(404).send("Not found");
  }
});

module.exports = router;
