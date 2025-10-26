const express = require("express")
const router = express.Router()
const signupROUTER = require("../controllers/Signup")
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/signup",upload.single('image'), signupROUTER)
module.exports=router