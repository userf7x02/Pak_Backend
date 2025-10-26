const express = require("express")
const Router = express.Router();
const  {CityArea,getAll} =require("../controllers/city_area")
Router.post(`/`,CityArea);
Router.get("/Get",getAll)
module.exports=Router;