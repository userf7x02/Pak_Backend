const express = require("express");
const Router = express.Router();
const { Category, getAll, getById } = require("../controllers/category");

Router.post("/", Category);          // ✅ create
Router.get("/Get", getAll);          // ✅ get all
Router.get("/:id", getById);         // ✅ get by id
console.log("✅ category route loaded");


module.exports = Router;
