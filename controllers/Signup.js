const SIGNUP = require("../models/Login_Signup");
const bcrypt = require("bcrypt");
const { uploadToCloudinary } = require("../common/cloudinary");

async function signup(req, res) {
  try {
    const { username, email, password, contact } = req.body;

    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);

    // Validation
    if (!username || !email || !password || !contact) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // ✅ Cloudinary upload for profile image
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    // Email check
    const existingUser = await SIGNUP.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Password check
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // ✅ Save user with Cloudinary URL
    const CreateUserData = await SIGNUP.create({
      username,
      email,
      password: hashpassword,
      contact,
      image: imageUrl, // ✅ Cloudinary URL save karo
    });

    res.status(200).json({
      success: true,
      message: "Signup successful with Cloudinary",
      user: CreateUserData,
    });
     
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

module.exports = signup;