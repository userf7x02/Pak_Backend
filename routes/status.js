const express = require("express")
const Router = express.Router();
const  Status =require("../controllers/status")
Router.post(`/`,Status);
module.exports=Router;