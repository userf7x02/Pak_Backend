const Category_Model = require("../models/category")
async function Category(req,res) {
    try {
        const { Name,Image } = req.body;
        if(!Name||!Image){
            return res.json("Please full fill the requirments")
        }
        const Data = await Category_Model.create({Name,Image});
        res.json({
      message: "Category created successfully",
      data: Data
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}
async function getAll(req,res) {
  

    try {
         const allCategories = await Category_Model.find();
         res.status(200).json(allCategories)
    } catch (err) {

        res.status(500).json({
            error:err.message
        })
        
    }
    
}
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

module.exports={Category,getAll,getById}
