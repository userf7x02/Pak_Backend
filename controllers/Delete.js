// const Advertisement = require("../models/Advertisement");
// const fs = require("fs");
// const path = require("path");

// const deleteAd = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const ad = await Advertisement.findById(id);
//     if (!ad) return res.status(404).json({ message: "Advertisement not found" });

//     // Delete image from uploads
//     if (ad.Image) {
//       const imagePath = path.join(__dirname, "../uploads", ad.Image);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     }

//     await Advertisement.findByIdAndDelete(id);
//     res.json({ message: "Advertisement deleted successfully" });
//   } catch (err) {
//     console.error("Delete advertisement error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { deleteAd };
