const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },dob:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },profilePic:{
        type:String,
        
    },
    role:{
        type:String,
        default:'GENERAL'
    }

})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel