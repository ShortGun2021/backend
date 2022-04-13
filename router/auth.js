const { response } = require('express');
const express = require('express');
const router = express.Router();
require('../db/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');
// const cookieParser = require("cookie-parser");
// router.use(cookieParser) ;

router.get('/', (req, res) => {
    res.send(`Hello World from the Server in auth.js`);
})

// using promises
// router.post('/register', (req, res) => {
//     const {name, email, phone, work, password, confirmPassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !confirmPassword){
//         return res.status(422).json({error: "Some data fields are missing"});
//     }
//     User.findOne({email: email})
//         .then((userExists) => {
//             if(userExists){
//                 return res.status(422).json({error: "User with this email already exists"});
//             }
//             const user = new User({name, email, phone, work, password, confirmPassword});

//             user.save().then(() => {
//                 res.status(201).json({message: "User Registered Successfully"});
//             }).catch((err)=>{
//                 res.status(500).json({error: "User Failed to Register"});
//                 console.log(err);
//             })
//         }).catch((err)=>{
//             console.log(err);
//         })
// })

//using asynch await
router.post('/register', async (req, res) => {
    const {name, email, phone, work, password, confirmPassword} = req.body;
    if(!name || !email || !phone || !work || !password || !confirmPassword){
        return res.status(422).json({error: "Some data fields are missing"});
    }
    try{
        const userEmailExists = await User.findOne({email: email});
        const userphoneExists = await User.findOne({phone: phone});

        if(userEmailExists){
            return res.status(422).json({error: "User with this email already exists"});
        }
        if(userphoneExists){
            return res.status(422).json({error: "User with this phone already exists"});
        }
        if(password != confirmPassword){
            return res.status(422).json({error: "Password is not matching with the Confirm Password"});
        }
        else{
            const user = new User({name, email, phone, work, password, confirmPassword});
            await user.save();
            res.status(201).json({message: "User Registered Successfully"});
        }
    }
    catch(error){
        console.log(error);
    }
})

//login route
router.post('/signin',async (req,res) => {
    try{
        let token;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Empty Credentials!"});
        }
        const userLogin = await User.findOne({email: email});
        
        if(userLogin){
            const passMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+25892000000),
                httpOnly: true
            });

            if(passMatch) res.json({message:"User Signin Successfull!"});
            else return res.status(400).json({error:"Invaid Credentials!"});
        } 
        else return res.status(400).json({error:"Invaid Credentials!"});
    } catch(err){
        console.log(err);
    }
})

//about us page
router.get('/about', authenticate, (req, res) => {
    res.send(`This is about my project`);
    res.send(req.rootUser);
})

module.exports = router;