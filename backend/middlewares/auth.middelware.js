const jwt =require('jsonwebtoken');
const userModel =require('../models/user.models');
const bcrypt =require('bcrypt');
const blackListToken= require('../models/blacklisttoken.model');
module.exports.authUser=async(req,res,next )=>{

    const token =req.cookies.token || req.headers.authorization?.split(' ')[1] 

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    const isBlacklisted= await blackListToken.findOne({token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await userModel.findById(decodedToken._id)
        next()
    }catch(error){
        res.status(401).json({message:'Unauthorized'})
    }

}

module.exports.authCaption=async(req,res,next )=>{
 const token =req.cookies.token || req.headers.authorization?.split(' ')[1] 

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    const isBlacklisted= await blackListToken.findOne({token})
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        req.caption=await captionModel.findById(decodedToken._id)
        next()
    }catch(error){
        res.status(401).json({message:'Unauthorized'})
    }

}