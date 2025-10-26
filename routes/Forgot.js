const express = require("express");
const Router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/Forgot");

Router.post("/forgot", forgotPassword);
Router.post("/reset", resetPassword);

module.exports = Router;
