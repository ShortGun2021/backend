const mongoose = require("mongoose");

const nftCreateSchema = new mongoose.Schema({
  nftUrl: {
    type: String,
    required: true,
  },
  nftImageUrl: {
    type: String,
    required: true,
  },
  nftName: {
    type: String,
    required: true,
  },
  nftSymbol: {
    type: String,
    required: true,
  },
  nftDescription: {
    type: String,
    required: true,
  },
  seller_fee_basis_points: {
    type: Number,
    required: true,
  },
  nftTraitType: {
    type: String,
    required: true,
  },
  nftValue: {
    type: String,
    required: true,
  },
  nftCategory: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    default: "",
  },







  // nftproperties: {
  //   type: Array,
  //   required: false,
  // },
  // nftlevels: {
  //   type: Array,
  //   required: false,
  // },
  // nftstats: {
  //   type: Array,
  //   required: false,
  // },
  // unlockableContent: {
  //   type: Boolean,
  //   required: false,
  // },
  // nftexplicitContent: {
  //   type: Boolean,
  //   required: false,
  // },
  // nftsupply: {
  //   type: Number,
  //   required: true,
  // },
  // nftchainName: {
  //   type: String,
  //   required: false,
  // },
  // nftfreezeMetadata: {
  //   type: Boolean,
  //   required: false,
  // },
  // nftcreated: {
  //   type: Date,
  //   default: Date.now(),
  // },

  // nftexplorer: {
  //   type: String,
  //   required: false,
  // },
  // nftlikes: {
  //   type: Number,
  //   required: false,
  // },
  // nftdetails: {
  //   type: String,
  //   required: false,
  // },
  // nftsale_ending_time: {
  //   type: String,
  //   required: false,
  // },
  // nftbidAmount: {
  //   type: Number,
  //   required: false,
  // },
  // nftbidHistory: {
  //   type: Array,
  //   required: false,
  // },
  // nftpriceHistory: {
  //   type: Array,
  //   required: false,
  // },
  // nftoffers: {
  //   type: Array,
  //   required: false,
  // },
  // nftitemActivity: {
  //   type: Array,
  //   required: false,
  // },
});

//generating user token
// nftCreateSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

const createNFT = mongoose.model("createNFT", nftCreateSchema);

module.exports = createNFT;
