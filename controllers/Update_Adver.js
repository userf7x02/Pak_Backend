// const Advertisement = require("../models/Advertisement");
// const fs = require("fs");
// const path = require("path");

// const updateAd = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { Name, Description, Price, CityArea, Category, Features, StartsOn, EndsOn } = req.body;

//     const ad = await Advertisement.findById(id);
//     if (!ad) return res.status(404).json({ message: "Advertisement not found" });

//     // Update all fields if provided
//     ad.Name = Name || ad.Name;
//     ad.Description = Description || ad.Description;
//     ad.Price = Price || ad.Price;
//     ad.CityArea = CityArea || ad.CityArea;
//     ad.Category = Category || ad.Category;
//     ad.Features = Features || ad.Features;
//     ad.StartsOn = StartsOn || ad.StartsOn;
//     ad.EndsOn = EndsOn || ad.EndsOn;

//     // Update image if uploaded
//     if (req.file) {
//       if (ad.Image) {
//         const oldImagePath = path.join(__dirname, "../uploads", ad.Image);
//         if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//       }
//       ad.Image = req.file.filename;
//     }

//     await ad.save();
//     res.json(ad);
//   } catch (err) {
//     console.error("Update advertisement error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { updateAd };
