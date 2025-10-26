const Status_Model = require("../models/status")
async function Status(req,res) {
    try {
        const {Name} = req.body;
        if(!Name){
            return res.json("Please full fill the requirments")
        }
        const Data = await Status_Model.create({Name});
        res.json({
      message: "status created successfully",
      data: Data
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}
module.exports=Status;
