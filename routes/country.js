const express = require("express")
const Router = express.Router();
const  Country =require("../controllers/country")
Router.post(`/`,Country);
module.exports=Router;