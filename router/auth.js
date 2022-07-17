const { response } = require("express");
const express = require("express");
const router = express.Router();
require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/userSchema");

router.post("/register", async (req, res) => {
  const { username, email, publicID } = req.body;
  if (!username || !email || !publicID) {
    return res.status(422).json({ error: "Some data fields are missing" });
  }
  try {
    const userEmailExists = await User.findOne({ email: email });
    const userpublicIDExists = await User.findOne({ publicID });

    if (userEmailExists) {
      return res
        .status(422)
        .json({ error: "User with this email already exists" });
    }
    if (userpublicIDExists) {
      return res
        .status(422)
        .json({ error: "User with this publicID already exists" });
    } else {
      const user = new User({
        username,
        email,
        publicID,
      });
      await user.save();
      return res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});

//login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { publicID } = req.body;
    if (!publicID) {
      return res.status(400).json({ error: "Empty Credentials!" });
    }
    const userLogin = await User.findOne({ publicID });

    if (userLogin) {
      token = await userLogin.generateAuthToken();
      // console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      // console.log(userLogin.name);

      const { _id, publicID } = userLogin;
      res.status(201).json({
        token,
        user: { _id, publicID },
      });
    } else return res.status(400).json({ error: "Invaid Credentials!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
});

router.post("/walletAddress", async (req, res) => {
  // res.send("Forgot password Route");
  const { email, walletAddress } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: " User don't exist" });
    }
    await User.updateOne({ walletAddress: walletAddress });
    res.status(200).send({ message: "Wallet Address Updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
});
module.exports = router;
