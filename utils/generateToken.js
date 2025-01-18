const jwt=require('jsonwebtoken')



const generateToken=async(userId,res)=>{
    //    creating token
    const token=jwt.sign(       
        {userId},
        process.env.JWS_CODE,
        {expiresIn:"15d"})

        res.cookie("jwt",token,{
            maxAge:15*24*60*1000,
            httpOnly:true, //XSS acttacks 
            sameSite:"strict", //CSRF attacks
            secure:process.env.NODE_ENV!=="develepment"
        })
}

module.exports={generateToken}