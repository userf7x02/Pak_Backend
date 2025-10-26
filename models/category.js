const {Schema,SchemaTypes,model} = require("mongoose")
const CategorySchema = new Schema ({
    Name:{
        type:String,
        required:true
    },
    Image:{
         type:String,
        required:true
    }
})
const Category=model("Category",CategorySchema)
module.exports=Category;