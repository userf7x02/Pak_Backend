const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const Advertisement_Model = require("../models/Advertisement");

const {
  Advertisement,
  getCarsByCategory,
  getbyid,
  getAdsByUser,
  deleteAd,
  updateAd,
  searchAds,
} = require("../controllers/Advertisement");

// 🖼 Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

// ✅ Routes
Router.get("/search", searchAds);
Router.post(`/`, upload.single("Image"), Advertisement);
Router.get(`/category/:categoryId`, getCarsByCategory);
Router.get(`/user/:userId`, getAdsByUser);

// ✅ Get All Advertisements
Router.get("/getAll", async (req, res) => {
  try {
    const ads = await Advertisement_Model.find()
      .populate("CityArea")
      .populate("userId")
      .populate("Category")
      .sort({ createdAt: -1 }); // latest first
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Single Advertisement by ID
Router.get(`/:id`, getbyid);

// ✅ Update Advertisement
Router.put(`/update/:id`, upload.single("Image"), updateAd);

// ✅ Delete Advertisement
Router.delete(`/delete/:id`, deleteAd);

module.exports = Router;
