const express = require("express");
const { signUp, signIn } = require("../controllers/auth");
const verifyToken = require("../verifyToken");

const router = express.Router();

//CREATE AN USER
router.post("/signup", signUp);

//SIGNIN
router.post("/signin", signIn);

//GOOGLE AUTHENTICATION
// router.post("google", googleAuth);
module.exports = router;
