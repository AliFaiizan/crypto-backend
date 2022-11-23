const express= require('express');
const { check } = require('express-validator');
const UserController= require('../Controllers/user');
const User = require('../models/user');


const router= express.Router()

//register
router.post("/register",
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async(email) => {
      const user= await User.findOne({email:email});
      if(user){
        return Promise.reject("Email already exists");
      }  
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 character long")
    .custom((value,{req}) => { 
      
        if(!value===req.body.confirmPassword){
          
            throw new Error("Password does not match")
        }
        return true
     }),
  check("first_name").isLength({ min: 3 }).withMessage("First name is too short"),
  check("last_name").isLength({ min: 3 }).withMessage("Last name is too short"),
 
  UserController.register
);

//activate
router.post('/activate/',UserController.activate)
//login
router.post('/login',
     check("email").isEmail().withMessage("Email is not valid")   
,UserController.login)




module.exports=router;