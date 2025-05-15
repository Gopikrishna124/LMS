const User=require('../../models/userModel').module
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const env=require('dotenv').config()

const loginController=async(req,res)=>{
    const {email,password}=req.body
    console.log('eail',email)
    try {
        const requiredEmail=await User.findOne({email})
        

        if(!requiredEmail){
            throw new Error('no such email exists')
        }
        const decrypt=await bcrypt.compare(password,requiredEmail.password)
        
        if(!decrypt){
            throw new Error('invalid credentails')
        }


         const token={
            id:requiredEmail._id,
            username:requiredEmail.username,
            email:requiredEmail.email,
            role:requiredEmail.role
         }
       
        
        const tokenData=await jwt.sign(token,process.env.JSON_SECRET,{expiresIn:'5min'})

        
             res.cookie('portalToken',tokenData,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            data:{
                id:requiredEmail._id,
                username:requiredEmail.username,
                email:requiredEmail.email,
                role:requiredEmail.role
            },
            message:'login successfull',
            success:true,
            error:false
        })
    } catch (err) {
        res.json({
            message:err.message || err,
            success:false,
            error:true
        })
    }
}

exports.module=loginController