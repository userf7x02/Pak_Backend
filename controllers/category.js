const Category_Model = require("../models/category");
const { uploadToCloudinary } = require("../common/cloudinary");

// ✅ Create Category with Cloudinary
async function Category(req, res) {
    try {
        const { Name } = req.body;
        
        // ✅ Cloudinary upload for category image
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file);
        } else {
            return res.status(400).json({ message: "Please upload a category image." });
        }

        if (!Name || !imageUrl) {
            return res.status(400).json({ message: "Please fulfill all the required fields." });
        }

        const Data = await Category_Model.create({
            Name, 
            Image: imageUrl // ✅ Cloudinary URL save karo
        });
        
        res.status(201).json({
            message: "Category created successfully with Cloudinary",
            data: Data
        });
    } catch (e) {
        console.log("❌ Create Category Error:", e.message);
        res.status(500).json({ Error: e.message });
    }
}

// ✅ Get All Categories (No changes needed)
async function getAll(req, res) {
    try {
        const allCategories = await Category_Model.find();
        res.status(200).json(allCategories);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

// ✅ Get Category by ID (No changes needed)
async function getById(req, res) {
    try {
        const category = await Category_Model.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { Category, getAll, getById };