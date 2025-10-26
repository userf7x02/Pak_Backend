const express = require("express")
const router = express.Router()
const loginROUTER = require("../controllers/Login")
router.post("/login",loginROUTER)
module.exports=router