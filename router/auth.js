const { response } = require("express");
const express = require("express");
const router = express.Router();
require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/nftCreateSchema");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send(`Hello World from the Server in NFTauth.js`);
});

//using asynch await
router.post("/register", async (req, res) => {
  const {
    nftImg,
    nftName,
    nftLink,
    nftDescription,
    nftCollectionName,
    nftCreatorDetails,
    nftproperties,
    nftlevels,
    nftstats,
    unlockableContent,
    nftexplicitContent,
    nftsupply,
    nftchainName,
    nftfreezeMetadata,
    nftcreated,
    nftseller_fee_basis_points,
    nftexplorer,
    nftlikes,
    nftdetails,
    nftsale_ending_time,
    nftbidAmount,
    nftbidHistory,
    nftpriceHistory,
    nftoffers,
    nftitemActivity,
  } = req.body;
  if (!nftName) {
    return res.status(422).json({ error: "Some data fields are missing" });
  }
  try {
    const user = new User({
      nftImg,
      nftName,
      nftLink,
      nftDescription,
      nftCollectionName,
      nftCreatorDetails,
      nftproperties,
      nftlevels,
      nftstats,
      unlockableContent,
      nftexplicitContent,
      nftsupply,
      nftchainName,
      nftfreezeMetadata,
      nftcreated,
      nftseller_fee_basis_points,
      nftexplorer,
      nftlikes,
      nftdetails,
      nftsale_ending_time,
      nftbidAmount,
      nftbidHistory,
      nftpriceHistory,
      nftoffers,
      nftitemActivity,
    });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.log(error);
  }
});

//login route
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Empty Credentials!" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const passMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (passMatch) res.json({ message: "User Signin Successfull!" });
      else return res.status(400).json({ error: "Invaid Credentials!" });
    } else return res.status(400).json({ error: "Invaid Credentials!" });
  } catch (err) {
    console.log(err);
  }
});

//about us page
router.get("/about", authenticate, (req, res) => {
  return res.send(req.rootUser);
  //return res.send(`This is about my project`);
});

module.exports = router;
