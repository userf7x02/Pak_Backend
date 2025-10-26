const {Schema,SchemaTypes,model} = require("mongoose")
const StatusSchema = new Schema ({
    Name:{
        type:String,
        required:true
    }
})
const Status=model("Status",StatusSchema)
module.exports=Status;