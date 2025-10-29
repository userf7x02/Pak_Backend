const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const { Category, getAll, getById } = require("../controllers/category");

// ✅ Multer setup for category images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

// ✅ Routes with image upload
Router.post("/", upload.single("Image"), Category);          // ✅ create with image
Router.get("/Get", getAll);          // ✅ get all
Router.get("/:id", getById);         // ✅ get by id
console.log("✅ category route loaded");

module.exports = Router;