
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()



const dbConnection=async()=>{

    try {
      await  mongoose.connect(process.env.MONGODB_URL)
        console.log("db Connected...")
    } catch (error) {
        console.error(error.message)

        process.exit(1)
    }

}

module.exports={dbConnection}