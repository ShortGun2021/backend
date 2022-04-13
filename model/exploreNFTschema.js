const mongoose = require('mongoose');

const exploreNFT = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        type: String,
        required: true
    },
    bannerImage: {
        data: Buffer,
        type: String,
        required: true
    },
    blueTick: {
        type: String,
        required: true
    },
    seller_fee_basis_points: {
        type: Number,
        required: true
    },
    properties: {
        files: [{ uri: String, "type": String }],
        category: String,
        creators: [{
            address: String,
            share: Number
        }]
    }
});

