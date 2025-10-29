const mongoose = require("mongoose");

async function connecting() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        console.log("Connection URI Present:", process.env.URI ? "Yes" : "No");
        
        // ✅ UPDATED: Remove deprecated options
        await mongoose.connect(process.env.URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            maxPoolSize: 10,
        });
        
        console.log("✅ MongoDB Connected Successfully!");
        console.log("📊 Database Name:", mongoose.connection.name);
        console.log("🌐 Host:", mongoose.connection.host);
        
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
        console.log("🔍 Full Error:", error);
        throw error;
    }
}

// Connection events
mongoose.connection.on('error', err => {
    console.log('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB Disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB Connected');
});

module.exports = connecting;