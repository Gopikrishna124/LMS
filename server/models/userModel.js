const mongoose=require('mongoose')
const {Schema}=mongoose

 const userSchema=new Schema({
     username:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     role:{
        type:String,
        default:'user'
     }
 })

 const User=mongoose.model('User',userSchema)
 exports.module=User