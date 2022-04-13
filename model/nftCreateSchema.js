// const mongoose = require('mongoose');

// const nftCreateSchema = new mongoose.Schema({
//     // nftImg: {
//     //     data: Buffer,
//     //     type: String,
//     //     required: true
//     // },
//     nftName: {
//         type: String,
//         required: true
//     },
//     // nftLink: {
//     //     type: String,
//     //     required: true
//     // },
//     // nftDescription: {
//     //     type: String,
//     //     required: true
//     // },
//     // nftCollectionName: {
//     //     type: String,
//     //     required: true
//     // },
//     // nftCreatorDetails: {
//     //     files: [{ uri: String, "type": String }],
//     //     category: String,
//     //     creators: [{
//     //         address: String,
//     //         share: Number
//     //     }]
//     // },
//     // nftproperties: {
//     //     type: Array,
//     //     required: false
//     // },
//     // nftlevels: {
//     //     type: Array,
//     //     required: false
//     // },
//     // nftstats: {
//     //     type: Array,
//     //     required: false
//     // },
//     // unlockableContent: {
//     //     type: Boolean,
//     //     required: false
//     // },
//     // nftexplicitContent: {
//     //     type: Boolean,
//     //     required: false
//     // },
//     // nftsupply: {
//     //     type: Number,
//     //     required: true
//     // },
//     // nftchainName: {
//     //     type: String,
//     //     required: false
//     // },
//     // nftfreezeMetadata: {
//     //     type: Boolean,
//     //     required: false
//     // },
//     // nftcreated: {
//     //     type: Date,
//     //     default: Date.now()
//     // },
//     // nftseller_fee_basis_points: {
//     //     type: Number,
//     //     required: false
//     // },
//     // nftexplorer: {
//     //     type: String,
//     //     required: false
//     // },
//     // nftlikes: {
//     //     type: Number,
//     //     required: false
//     // },
//     // nftdetails: {
//     //     type: String,
//     //     required: false
//     // },
//     // nftsale_ending_time: {
//     //     type: String,
//     //     required: false
//     // },
//     // nftbidAmount: {
//     //     type: Number,
//     //     required: false
//     // },
//     // nftbidHistory: {
//     //     type: Array,
//     //     required: false
//     // },
//     // nftpriceHistory: {
//     //     type: Array,
//     //     required: false
//     // },
//     // nftoffers: {
//     //     type: Array,
//     //     required: false
//     // },
//     // nftitemActivity: {
//     //     type: Array,
//     //     required: false
//     // }
// });

// const createNFT = mongoose.model('createNFT', nftCreateSchema);

// module.exports = createNFT;


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})

const User = mongoose.model('USER', userSchema);

module.exports = User;