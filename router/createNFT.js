const { response } = require("express");
const express = require("express");
const router = express.Router();
const createNFT = require("../model/nftCreateSchema");

module.exports = router;

router.post("/", async (req, res) => {
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

// router.post('/create', async (req, res) => {
//     const {name, email, phone, work, password, confirmPassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !confirmPassword){
//         return res.status(422).json({error: "Some data fields are missing"});
//     }
//     try{
//         const userEmailExists = await User.findOne({email: email});
//         const userphoneExists = await User.findOne({phone: phone});

//         if(userEmailExists){
//             return res.status(422).json({error: "User with this email already exists"});
//         }
//         if(userphoneExists){
//             return res.status(422).json({error: "User with this phone already exists"});
//         }
//         if(password != confirmPassword){
//             return res.status(422).json({error: "Password is not matching with the Confirm Password"});
//         }
//         else{
//             const user = new User({name, email, phone, work, password, confirmPassword});
//             await user.save();
//             res.status(201).json({message: "User Registered Successfully"});
//         }
//     }
//     catch(error){
//         console.log(error);
//     }
// })
