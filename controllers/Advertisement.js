const mongoose = require("mongoose");
const Advertisement_Model = require("../models/Advertisement");
const fs = require("fs");
const path = require("path");
const { uploadToCloudinary } = require("../common/cloudinary");
// ✅ Create Advertisement
// ✅ Create Advertisement with Cloudinary
async function Advertisement(req, res) {
    try {
        const { Name, Description, EndsOn, Features, Price, StartsOn, CityArea, Category, userId } = req.body;
        
        // ✅ YEH SECTION CHANGE KARO - Cloudinary upload
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file);
        } else {
            return res.status(400).json({ message: "Please upload an image." });
        }

        // Required fields check
        if (!Name || !Description || !EndsOn || !Features || !Price || !StartsOn || !imageUrl || !CityArea || !Category) {
            return res.status(400).json({ message: "Please fulfill all the required fields." });
        }

        // ✅ YEH LINE CHANGE KARO - Cloudinary URL save karo
        const Data = await Advertisement_Model.create({
            Name,
            Description,
            EndsOn,
            Features,
            Price,
            StartsOn,
            CityArea: new mongoose.Types.ObjectId(CityArea),
            Image: imageUrl, // ✅ YEH CHANGE - filename ki jagah URL
            Category: new mongoose.Types.ObjectId(Category),
            userId: new mongoose.Types.ObjectId(userId),
        });

        res.status(201).json({
            message: "Advertisement created successfully with Cloudinary",
            data: Data,
        });
    } catch (e) {
        console.log("❌ Create Advertisement Error:", e.message);
        res.status(500).json({ Error: e.message });
    }
}

// Get Ad by ID
async function getbyid(req, res) {
    try {
        const { id } = req.params;
        const ad = await Advertisement_Model.findById(id)
            .populate("CityArea")
            .populate("userId")
            .populate("Category"); 
        // console.log(" Ad Data:", ad);

        if (!ad) {
            return res.status(404).json({ message: "Advertisement not found" });
        }

        res.status(200).json(ad);
    } catch (err) {
        console.log("❌ GetById Error:", err.message);
        res.status(500).json({ error: err.message });
    }
}

//  Get Cars by Category
const getCarsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const ads = await Advertisement_Model.find({
            Category: new mongoose.Types.ObjectId(categoryId),
        })
            .populate("CityArea")
            .populate("userId")
            .populate("Category")
            .sort({ createdAt: -1 });

        res.status(200).json(ads);
    } catch (err) {
        console.log("❌ GetCarsByCategory Error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
async function getAdsByUser(req, res) {
    try {
        const ads = await Advertisement_Model.find({ userId: req.params.userId })
            .populate("CityArea")   
            .populate("Category")    
            .populate("userId")   
            .sort({ createdAt: -1 });
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const deleteAd = async (req, res) => {
    try {
        const { id } = req.params;
        const ad = await Advertisement_Model.findById(id);
        if (!ad) return res.status(404).json({ message: "Advertisement not found" });

        // ✅ YEH SECTION DELETE KARO - Image delete ki zaroorat nahi
        // if (ad.Image) {
        //     const imagePath = path.join(__dirname, "../uploads", ad.Image);
        //     if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        // }

        await Advertisement_Model.findByIdAndDelete(id);
        res.json({ message: "Advertisement deleted successfully" });
    } catch (err) {
        console.error("Delete advertisement error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
const updateAd = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Description, Price, CityArea, Category, Features, StartsOn, EndsOn } = req.body;

        const ad = await Advertisement_Model.findById(id);
        if (!ad) return res.status(404).json({ message: "Advertisement not found" });

        // Update all fields if provided
        ad.Name = Name || ad.Name;
        ad.Description = Description || ad.Description;
        ad.Price = Price || ad.Price;
        ad.CityArea = CityArea || ad.CityArea;
        ad.Category = Category || ad.Category;
        ad.Features = Features || ad.Features;
        ad.StartsOn = StartsOn || ad.StartsOn;
        ad.EndsOn = EndsOn || ad.EndsOn;

        // ✅ YEH SECTION COMPLETELY CHANGE KARO - Cloudinary upload
        if (req.file) {
            const newImageUrl = await uploadToCloudinary(req.file);
            ad.Image = newImageUrl; // ✅ YEH CHANGE - filename ki jagah URL
            // Purani image delete karne ki zaroorat nahi
        }

        await ad.save();
        res.json(ad);
    } catch (err) {
        console.error("Update advertisement error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
const searchAds = async (req, res) => {
    try {
        const { name, category, area } = req.query;
        const filter = {};

        // ✅ Keyword (Name ya Description)
        if (name) {
            filter.$or = [
                { Name: { $regex: name, $options: "i" } },
                { Description: { $regex: name, $options: "i" } },
            ];
        }

        // ✅ Category filter (convert string to ObjectId)
        if (category && mongoose.Types.ObjectId.isValid(category)) {
            filter.Category = new mongoose.Types.ObjectId(category);
        }

        // ✅ CityArea filter (convert string to ObjectId)
        if (area && mongoose.Types.ObjectId.isValid(area)) {
            filter.CityArea = new mongoose.Types.ObjectId(area);
        }

        // ✅ Fetch filtered ads
        const ads = await Advertisement_Model.find(filter)
            .populate("Category")
            .populate("CityArea")
            .populate("userId")
            .sort({ createdAt: -1 });

        res.status(200).json(ads);
    } catch (error) {
        console.error("❌ Search Error:", error.message);
        res.status(500).json({ error: "Search failed", message: error.message });
    }
};



module.exports = { Advertisement, getCarsByCategory, getbyid, getAdsByUser, deleteAd, updateAd, searchAds };
