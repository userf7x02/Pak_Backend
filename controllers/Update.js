const User = require("../models/Login_Signup");
const { uploadToCloudinary } = require("../common/cloudinary");

// Update user profile with Cloudinary
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, contact } = req.body;

        // Find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update basic info
        user.username = username || user.username;
        user.email = email || user.email;
        user.contact = contact || user.contact;

        // ✅ Update image if uploaded to Cloudinary
        if (req.file) {
            const newImageUrl = await uploadToCloudinary(req.file);
            user.image = newImageUrl; // ✅ Cloudinary URL save karo
            // Purani image delete karne ki zaroorat nahi
        }

        await user.save();
        res.json(user); // send updated user
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    updateUser,
};