const { response } = require("express");
const express = require("express");
const router = express.Router();
const ImageInfo = require("../model/nftCreateSchema");

router.get("/getNFTs", async (req, res) => {
  // console.log(req.rootUser);
  // res.status(200).json(req.rootUser);
  try {
    const images = await ImageInfo.find({});
    // console.log(images);
    if (!images) return res.status(400).send({ message: "Invalid link" });
    else {
      res.status(200).send(images);
      // res.status(200).send(images);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//temporary route to handle buying
router.post("/buyNFTs", async (req, res) => {
  // console.log(req.rootUser);
  // res.status(200).json(req.rootUser);
  try {
    const { nftID, buyerEmail } = req.body;
    //buyeremail is posted from local storage
    console.log("working");
    console.log(nftID);
    console.log(buyerEmail);
    if (!buyerEmail) return res.status(400).send({ message: "No Buyer Email" });
    const nftCreator = await ImageInfo.findOne({
      _id: nftID,
      // nftCreatorDetails: creatorEmail,
    });

    // nftCreator.nftCreatorDetails = req.body.buyerEmail;
    await ImageInfo.updateOne({ nftCreatorDetails: req.body.buyerEmail });
    res.status(201).json({
      message: "NFT Buying Success. Creator Updated",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
