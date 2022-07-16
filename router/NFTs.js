const { response } = require("express");
const express = require("express");
const router = express.Router();
const NFTDetails = require("../model/nftDetailSchema");

router.get("/getNFTs", async (req, res) => {
  try {
    const NFTs = await NFTDetails.find({});
    if (!NFTs) return res.status(400).send({ message: "Invalid link" });
    // console.log(NFTs);
    else {
      res.status(200).send(NFTs);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//create NFT Details
router.post("/createNFT", async (req, res) => {
  const { nftUrl, nftImageUrl, nftName, nftSymbol, nftDescription, seller_fee_basis_points, nftTraitType, nftValue, nftCategory, walletAddress } = req.body;

  if (!nftUrl || !nftImageUrl || !nftName || !nftSymbol || !nftDescription || !seller_fee_basis_points || !nftTraitType || !nftValue || !nftCategory || !walletAddress) {
    return res.status(421).json({ error: "Some data fields are missing" });
  }

  try {
    const findnft = await NFTDetails.findOne({ nftUrl: nftUrl, nftImageUrl: nftImageUrl });
    if (findnft) {
      return res
        .status(422)
        .json({ error: "NFT with this link already exists. You cannot recreate NFT" });
    }
    else {
      const nftDetail = new NFTDetails({
        nftUrl, nftImageUrl, nftName, nftSymbol, nftDescription, seller_fee_basis_points, nftTraitType, nftValue, nftCategory, walletAddress
      });
      await nftDetail.save();
      // console.log(nftDetail._id);
      return res
        .status(201)
        .json({ message: "NFT creation success!!", nftId: nftDetail._id });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
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
    const nftCreator = await NFTDetails.findOne({
      _id: nftID,
      // nftCreatorDetails: creatorEmail,
    });

    // nftCreator.nftCreatorDetails = req.body.buyerEmail;
    await NFTDetails.updateOne({ nftCreatorDetails: req.body.buyerEmail });
    res.status(201).json({
      message: "NFT Buying Success. Creator Updated",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
