const {Schema,SchemaTypes,model} = require("mongoose");
const Province = require("../controllers/province");
const CountrySchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
     Province: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Province"
    }
})
const Country=model("Country",CountrySchema)
module.exports=Country;