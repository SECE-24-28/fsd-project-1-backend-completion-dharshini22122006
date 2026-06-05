const express = require("express");
const router = express.Router();
const {signupUser} = require("../Controllers/UserController");

router.post("/signup",signupUser);

module.exports = router;