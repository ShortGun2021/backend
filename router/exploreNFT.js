const { response } = require('express');
const express = require('express');
const router = express.Router();
// const connectDB = require('../../config/db');

router.get("/:tab", async (req, res) => {
    try {
        const { tab } = req.params;
        if (tab === 'trending') {
            console.log('trending');
            res.send("Trending")  
        }
        else if (tab === 'top') {
            res.send("top")
        }
        else if (tab === 'art') {
            res.send("art")
        }
        else if (tab === 'collectibles') {
            res.send("collectibles")
        }
        else if (tab === 'domainNames') {
            res.send("domainNames")
        }
        else if (tab === 'music') {
            res.send("music")
        }
        else if (tab === 'photography') {
            res.send("photography")
        }
        else if (tab === 'sports') {
            res.send("sports")
        }
        else if (tab === 'tradingCards') {
            res.send("tradingCards")
        }
        else if (tab === 'utility') {
            res.send("utility")
        }
        else if (tab === 'virtualWorlds') {
            res.send("virtualWorlds")
        }
        else {
            res.send("Invalid tab")
        }
    } catch (error) {
        
    }
})


module.exports = router;