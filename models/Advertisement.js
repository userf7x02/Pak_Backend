const { Schema, SchemaTypes, model } = require("mongoose");
const AdvertisementSchema = new Schema ({
  Image :{
    type:String,
    required:true
  },
   Description :{
    type:String,
    required:true
  },
   EndsOn :{
    type:String,
    required:true
  },
   Features :{
    type:String,
    required:true
  },
   Name :{
    type:String,
    required:true
  },
   Price :{
    type:String,
    required:true
  },
  StartsOn : {
    type:String,
    required:true 
  },
  CityArea : {
    type:Schema.Types.ObjectId,
    required:true,
    ref:"CityArea"
  },
  userId: {
  type: Schema.Types.ObjectId,
  ref: "Signup",
  required: true
},

  Category : {
    type:Schema.Types.ObjectId,
    required:true,
    ref:"Category"
  },
  
  }, { timestamps: true }); 
 


const Advertisement = model('Advertisement', AdvertisementSchema)

module.exports=Advertisement;
