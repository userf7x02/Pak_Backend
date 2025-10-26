const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/Update");
const multer = require("multer");
const path = require("path");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder jahan images save hongi
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// PUT request for updating user
router.put("/update/:id", upload.single("image"), updateUser);

module.exports = router;
