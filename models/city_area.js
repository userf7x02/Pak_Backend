const {Schema,SchemaTypes,model} = require("mongoose")
const CityAreaSchema = new Schema ({
    Name:{
        type:String,
        required:true
    }
})
const CityArea=model("CityArea",CityAreaSchema)
module.exports=CityArea;