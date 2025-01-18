const { userModel } = require("../models/user.model")
const bcrypt=require('bcryptjs')
const { generateToken } = require("../utils/generateToken")
const { json } = require("express")

// singup 
const singup=async(req,res)=>{

    try {
        const {username,fullname,email,password,confirmPassword}=req.body

        // validating email
        const regexEmail=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
       
        if(!regexEmail.test(email)){
          return  res.status(400).json({error:"Invalid email format"})
            
        }
        // checking existingUsername or email address
        const existingUsername=await userModel.findOne({username})
        const existingEmail =await userModel.findOne({email})

        if(existingUsername || existingEmail){
            return res.status(400).json({error:"Already Existing Username or Email"})
        }
        // checking password length
        if((password.length<6)){
            return res.status(400).json({error:"Password must have atleast 6 char length"})
        }
        // checking confirmPassword
       if (confirmPassword!==password){
            return res.status(400).json({error:"Please check your password!"})
        }
        // hashing the password
        // eg: 12345678=djasgjbbsauhdsmn

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        // creating new user
        const newUser=await new userModel({
            username,
            fullname,
            email,
            password:hashedPassword
        })
        if(newUser){
        generateToken(userModel._id,res)
            await newUser.save()
            res.status(200).json(newUser)
        }else(
            res.status(400).json({error:"Invalid User Data"})
        )

    } catch (error) {
        res.status(404).json({message:error.message})

    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// login
const login=async(req,res)=>{

    try {
        const {username,password}=req.body
        // finding user...
        oldUser=await userModel.findOne({username})
        // checking password
        isCorrectPassword=await bcrypt.compare(password,oldUser.password||"")

        if(!oldUser || !isCorrectPassword){
            return res.status(400).json({error:"Invalid Username or Password"})
        }

        // creating cookie
        generateToken(oldUser._id,res)
    
        res.status(200).json(oldUser)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// logout
const logout=async (req,res)=>{

    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json('Logout Successfully')
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}






     












        module.exports={singup,login,logout}
    
