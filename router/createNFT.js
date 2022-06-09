const { response } = require("express");
const express = require("express");
const router = express.Router();
const createNFT = require("../model/nftCreateSchema");

module.exports = router;

router.post("/createNFT", async (req, res) => {
  const {
    // nftImg,
    nftName,
    // nftLink,
    // nftDescription,
    // nftCollectionName,
    // nftCreatorDetails,
    // nftproperties, nftlevels,
    // nftstats, unlockableContent,
    // nftexplicitContent,
    // nftsupply,
    // nftchainName,
    // nftfreezeMetadata,
    // nftcreated,
    // nftseller_fee_basis_points,
    // nftexplorer,
    // nftlikes,
    // nftdetails,
    // nftsale_ending_time,
    // nftbidAmount,
    // nftpriceHistory,
    // nftoffers,
    // nftitemActivity
  } = req.body;

  const newNFT = {
    // nftImg,
    nftName,
    // nftLink,
    // nftDescription,
    // nftCollectionName,
    // nftCreatorDetails,
    // nftproperties, nftlevels,
    // nftstats, unlockableContent,
    // nftexplicitContent,
    // nftsupply,
    // nftchainName,
    // nftfreezeMetadata,
    // nftcreated,
    // nftseller_fee_basis_points,
    // nftexplorer,
    // nftlikes,
    // nftdetails,
    // nftsale_ending_time,
    // nftbidAmount,
    // nftpriceHistory,
    // nftoffers,
    // nftitemActivity
  };

  if (!nftImg || !nftName || !nftLink || !nftDescription) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  } else {
    console.log("#############################");
    createNFT.create(newNFT, (err, newNFT) => {
      console.log("******************************");
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Something went wrong",
        });
      } else {
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        return res.status(200).json({
          message: "NFT created successfully",
          newNFT,
        });
      }
    });
    // const nft = new createNFT(newNFT);
    // await nft.save();
    // res.status(201).json({message: "nft REGISTERED Successfully"});
  }
});
