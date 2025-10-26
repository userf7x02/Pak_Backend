const User = require("../models/Login_Signup"); // user model
const fs = require("fs");
const path = require("path");

// Update user profile
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

        // Update image if uploaded
        if (req.file) {
            // Delete old image if exists
            if (user.image && user.image.startsWith("/uploads")) {
                const oldImagePath = path.join(__dirname, "../", user.image);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
            user.image = `/uploads/${req.file.filename}`;
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
