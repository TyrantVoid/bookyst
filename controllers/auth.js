const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
const signUp = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json("user saved");
  } catch (error) {
    res.status(400).json(error);
  }
};
//SIGNIN
const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user not found");
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.status(400).json("wrong credentials");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, //req.body.isAdmin
      process.env.JWT_KEY
    );
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        path: "/",
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        // sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // Optional: 1 day expiration
      })
      .json({ ...others, token });
    console.log("cookie from auth controller: ", req.cookies.access_token);
    console.log("auth token: ", token);
  } catch (error) {
    res.status(400).json(error);
  }
};

//GOOGLEAUTH
// const googleAuth = async (req, res) => {

// };

module.exports = { signUp, signIn };
