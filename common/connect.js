const mongoose = require("mongoose");

async function connecting() {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (e) {
        console.log("❌ MongoDB Connection Error:", e.message);
    }
}

module.exports = connecting;
