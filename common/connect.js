const mongoose = require("mongoose")
async function connecting() {
    try {mongoose.connect(process.env.URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));mongoose.connect(process.env.URI)
        console.log("Data Base Connected Successfully")
    } catch (e) {
        console.log(e.message)
    }
}
module.exports=connecting;