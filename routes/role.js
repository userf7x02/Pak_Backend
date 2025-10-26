const express = require("express")
const Router = express.Router();
const  Role =require("../controllers/role")
Router.post(`/`,Role);
module.exports=Router;