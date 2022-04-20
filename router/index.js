const auth = require('./auth');
const createNFT = require('./createNFT');


module.exports = app => {
    
    app.get("/", function(req, res){
        req.session.name = 'Shortgun NFT Marketplace'
        res.send("Session Set")
    })     
    app.get("/session", function(req, res){
        var name = req.session.name
        res.send(name)
    })
    app.use('/auth', auth);
    app.use('/createNFT', createNFT);
    
};
