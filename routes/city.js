const express = require("express")
const Router = express.Router();
const  City =require("../controllers/city")
Router.post(`/`,City);
module.exports=Router;