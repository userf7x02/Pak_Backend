const mongoose = require("mongoose");

async function connecting() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await mongoose.connect(process.env.URI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
    }
}

module.exports = connecting;
