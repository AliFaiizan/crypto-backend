const { validationResult } = require('express-validator');
const User=require('../models/user');
const {GenerateToken, GenerateAuthToken} =require('../helpers/token');
const bcrypt = require('bcrypt');
const { SendGridVerificationEmail } = require("../helpers/mailer");

const jwt =require('jsonwebtoken');


module.exports.register=async(req,res,next) => { 
    const errors=validationResult(req);
    
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

      // for generating username if already exists
    let isValid = false;
    let usrn=req.body.user_name
    do {
        usernameExists = await User.findOne({ user_name: usrn});
        if(usernameExists===null){
            isValid=true;
        }else if (usernameExists) {
        usrn += ( new Date() * Math.random())
            .toString()
            .substring(0, 1);
        } else {
            isValid = true;
        }
    } while (!isValid);
    
    req.body["user_name"] = usrn;

    try{
        
        const {
            email,
            password,
        } = req.body

        let hash = bcrypt.hashSync(password, 8);
        
        const user = await new User({
          email,
          password:hash,
        }).save()

        const token = GenerateToken({id: user._id.toString() }, "4h");
        const authToken=GenerateAuthToken({id:user._id.toString()},'10d');
        
        console.log({
            dir:'user.controller',
            token})
            
        const url = `${process.env.BASE_URL}/activate/${token}`;

        //SendVerificationEmail(user.email, user.first_name, url);
        SendGridVerificationEmail(user.email,user.first_name,url)

        
        res.status(200).json({
            message:`Signup Complete please activate you account via the link sent to your account`,
            user:user.id,
            user_name,
            picture:"https://res.cloudinary.com/de1qop9bf/image/upload/v1662557098/default_pic.png",
            first_name,
            last_name,
            isVerified:user.isVerified,
            token:authToken
        })
        
    }catch{
        res.status(500).json({"message":"failed to register User"})
    }
 } 

module.exports.activate=async(req,res,next) =>{
    const token= req.body.token;
    const user = jwt.verify(token,process.env.TOKEN_SECRET)
    console.log(user)

    if(!user){
        return res.status(400).json({
            message:"invalid token"
        })
    }

    const alreadyVerified= await User.findOne({_id:user.id,verified:true})

    if(alreadyVerified){
        return res.status(400).json({
            message:'This email is already verified'
        })
    }

    await User.findByIdAndUpdate({_id:user.id},{verified:true})

    res.status(200).json({
        message:'Sucessfully Verified Email'
    })

}

module.exports.login= async (req,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.findOne({email})
    
        if(!user){
            throw new Error('User Does not Exists');
        }
    
        const check=bcrypt.compareSync(password,user.password)
    
        if(!check){
            throw new Error('Password is incorrect');
        }

       const authToken = GenerateAuthToken({ id: user._id.toString() }, "30m");

       res.status(200).json({
        userid:user._id,
        token:authToken
       })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }



}