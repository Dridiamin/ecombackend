//require jwt 
const jwt = require('jsonwebtoken')

// Require the user Schema
const User = require("../models/usermodel")

exports.isAuth = async (req, res, next)=>{
   try {
    const token = req.headers['x-auth']
  
    // Check for token
    if(!token) return res.status(401).json("message: No Access")
    const user =  jwt.verify(token, process.env.SECRET_KEY, async(err,decoded)=>{
        if(err) return res.status(401).json({message: "No Token, authorization denied"})
        const currUser = await User.findById(decoded._id)
        req.user = currUser
        next()

    });

   } catch (error) {
    
   }
}