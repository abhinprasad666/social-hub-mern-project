const express=require('express')
const { singup }= require('../controllers/auth-controllers')

const router=express.Router()





// 
router.get('/singup',singup)











module.exports= router