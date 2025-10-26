const {Schema,SchemaTypes,model} = require("mongoose");
const CityArea = require("../controllers/city_area");
const CitySchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
    CityArea : {
    type:Schema.Types.ObjectId,
    required:true,
    ref:"CityArea"
}

})
const City=model("City",CitySchema)
module.exports=City;