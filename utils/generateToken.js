const jws=require('jsonwebtoken')
// const dotenv=require('dotenv')



// dotenv.config()


const generateToken=async(userId,res)=>{
       
    const token=jws.sign(
        {userId},
        process.env.JWS_CODE,
        {expiresIn:"15d"})

        res.cookie("jws",token,{
            maxAge:15*24*60*1000,
            httpOnly:true, //xss acttacks 
            sameSite:"strict",
            secure:process.env.NODE_ENV!=="develepment"
        })
}

module.exports={generateToken}