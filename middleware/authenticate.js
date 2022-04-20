const jwt = require('jsonwebtoken');
const User = require('../model/nftCreateSchema');

const authenticate = async (req, res, next)=>{
    try {
        //const token = req.cookies.jwtoken;
        //const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({nftLink: "1929005"});
        console.log("Root user is: "+rootUser);
        if(!rootUser) throw new Error("User not Found!");

        //req.token = token;
        req.rootUser = rootUser;
        //req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
    }
}
module.exports = authenticate;