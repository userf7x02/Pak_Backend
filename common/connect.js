const mongoose = require("mongoose");

async function connecting() {
    try {
        // Vercel serverless optimized connection
        const conn = await mongoose.connect(process.env.URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 1,
            minPoolSize: 0,
            maxIdleTimeMS: 30000,
            bufferCommands: false
        });
        
        console.log("✅ MongoDB Connected Successfully to:", conn.connection.host);
        return conn;
        
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
        // Don't throw, let server start without DB
        return null;
    }
}

module.exports = connecting;
