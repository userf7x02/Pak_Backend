const City_Model = require("../models/city")
async function City(req,res) {
    try {
        const {Name,Country} = req.body;
        if(!Name||!Country){
            return res.json("Please full fill the requirments")
        }
        const Data = await City_Model.create({Name,Country});
        res.json({
      message: "City created successfully",
      data: Data
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}
module.exports=City