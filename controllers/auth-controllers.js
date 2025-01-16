const singup=(req,res)=>{
    try {
        res.status(200).json('singup page')

    } catch (error) {
        res.status(404).json({message:error.message})

    }
}







     












        module.exports={singup}
    
