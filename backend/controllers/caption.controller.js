const captionModel=require('../models/caption.model');
const captionService=require('../services/caption.service');
const {validationResult}=require('express-validator');

module.exports.registerCaption=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {fullname,email,password,vehicle}=req.body;
        const user=await userService.findUserByEmail(email);
        if(user){
            return res.status(400).json({message:'User already exists'});
        }
        const hashPassword=await userModel.hashPassword(password);
        const caption=await captionService.createCaption(
            {fullname,email,hashPassword,vehicle}
        );
    const token = caption.generateJSONWebToken();  
    res.status(201).json({
        message:'caption registered successfully',
        token:token  
    })  
}catch(error){
    console.log(error);
    res.status(500).json({message:'Internal server error',error:error.message});
} 
}

module.exports.logincaption=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,password}=req.body;
        const caption=await captionService.findUserByEmail(email);
        if(!caption){
            return res.status(404).json({message:'User not found'});
        }
        const isMatch=await caption.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
        }
        const token=caption.generateJSONWebToken();
        res.status(200).json({message:'User logged in successfully',caption,token});
    }catch(error){
        res.status(500).json({message:'Internal server error',error:error.message});
    }
    res.cookie('token',token,{maxAge:24*60*60*1000,httpOnly:true});
    res.json({message:'User logged in successfully',token});


}

module.exports.getProfile = async(req,res)=>{
    try{
        const {email}=req.body;
        const caption=await captionService.findUserByEmail(email);
        if(!caption){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User profile fetched successfully',caption});
    }catch(error){
        res.status(500).json({message:'Internal server error',error:error.message});
    }
}

module.exports.logoutCaption = async(req,res)=>{
    try{
        res.clearCookie('token');
        const token=req.cookies.token;
        await blackListToken.create({token});
        res.status(200).json({message:'User logged out successfully'});
    }catch(error){
        res.status(500).json({message:'Internal server error',error:error.message});
    }
}