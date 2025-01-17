const express=require('express')
const { singup,login,logout }= require('../controllers/auth-controllers')

const router=express.Router()





// 
router.post('/singup',singup)
// 
router.post('/login',login)
// 
router.post('/logout',logout)










module.exports= router