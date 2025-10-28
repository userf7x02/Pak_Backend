const mongoose = require("mongoose");

async function connecting() {
    try {
        // Remove deprecated options for Vercel
        await mongoose.connect(process.env.URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 5, // Important for Vercel
            bufferCommands: false, // Important for serverless
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (e) {
        console.log("❌ MongoDB Connection Error:", e.message);
    }
}

module.exports = connecting;
