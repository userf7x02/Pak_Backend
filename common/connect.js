const mongoose = require("mongoose");

const MONGODB_URI = process.env.URI;

// Vercel serverless connection
async function connecting() {
    if (mongoose.connection.readyState === 1) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        console.log("🔄 Connecting to MongoDB on Vercel...");
        
        // Vercel-specific connection
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            bufferCommands: false,
            bufferMaxEntries: 0
        });
        
        console.log("✅ MongoDB Connected on Vercel!");
        
    } catch (error) {
        console.log("❌ Vercel MongoDB Connection Failed:", error.message);
        // Don't throw error for Vercel
    }
}

module.exports = connecting;
