const CityArea_Model = require("../models/city_area")
async function CityArea(req,res) {
    try {
        const {Name} = req.body;
        if(!Name){
            return res.json("Please full fill the requirments")
        }
        const Data = await CityArea_Model.create({Name});
        res.json({
      message: "CityArea created successfully",
      data: Data
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}

async function getAll(req,res) {
  

    try {
         const allCityArea = await CityArea_Model.find();
         res.status(200).json(allCityArea)
    } catch (err) {

        res.status(500).json({
            error:err.message
        })
        
    }
    
}

// async function getbyid(req,res) {
//     try {
//         const id = req.params.id
//         const getbyid = await Area.findById(id).populate("user")
//          res.status(200).json(getbyid)
//     } catch (err) {
//         res.status(500).json({
//             error:err.message
//         })
//     }
// }

// getAll,getbyid

module.exports={CityArea,getAll}