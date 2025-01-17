const { Timestamp } = require('bson')
const { timeStamp } = require('console')
const mongoose=require('mongoose')


// creating user datas schema

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:4
    },
    fullname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    confirmPassword:{
        type:String,     
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    frofileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    },

},{Timestamps:true})

const userModel=mongoose.model('User',UserSchema)

module.exports={userModel}