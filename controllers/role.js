const Role_Model = require("../models/role")
async function Role(req,res) {
    try {
        const { Name } = req.body;
        if(!Name){
            return res.json("Please full fill the requirments")
        }
        const roleData = await Role_Model.create({Name});
        res.json({
      message: "Roles created successfully",
      data: roleData
    });
    } catch (e) {
        console.log(e.message)
        res.json({Error:e.message})
    }
}
module.exports=Role
