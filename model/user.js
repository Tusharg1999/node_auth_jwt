const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:256
    },
    email:{
        type:String,
        required:true,
        max:256
    },
    password:{
        type:String,
        required:true,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const user=mongoose.model('user',userSchema)
module.exports=user