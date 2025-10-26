const SIGNUP = require("../models/Login_Signup");
const bcrypt = require("bcrypt");


async function signup(req, res) {
  try {
    const { username, email, password, contact } = req.body;

    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);

    // Validation
    if (!username || !email || !password || !contact) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Image path
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

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

    // Save user
    const CreateUserData = await SIGNUP.create({
      username,
      email,
      password: hashpassword,
      contact,
      image: imagePath,
    });

    res.status(200).json({
      success: true,
      message: "Signup successful",
      user: CreateUserData,
    });
     
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

module.exports = signup;
