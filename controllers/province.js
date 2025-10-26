const Province_Model = require("../models/province")
async function Province(req,res) {
    try {
        const { Name } = req.body;
        if(!Name){
            return res.json("Please full fill the requirments")
        }
        const Data = await Province_Model.create({Name});
        res.json({
      message: "Province created successfully",
      data: Data
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}
module.exports=Province