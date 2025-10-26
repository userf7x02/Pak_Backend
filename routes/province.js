const express = require("express")
const Router = express.Router();
const  province =require("../controllers/province")
Router.post(`/`,province);
module.exports=Router;