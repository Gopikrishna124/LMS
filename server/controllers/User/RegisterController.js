const User=require('../../models/userModel').module
const bcrypt=require('bcryptjs')
var salt = bcrypt.genSaltSync(10);


const registerController=async(req,res)=>{
      const {username,email,password}=req.body
      console.log('body',req.body)
    try {
        const user= new User(req.body)
        const existingUser=await User.findOne({
            $or:[{username:req.body.username},{email:req.body.email}]
        })
        console.log('existing email',existingUser)
        if(existingUser){
            throw new Error('user or email already Exists')
        }
        if(!username || !email || !password){
            throw new Error('all fields must be filled')
        }
        const bcryptedPassword=  bcrypt.hashSync(req.body.password, salt);
        
        user.password=bcryptedPassword
       const result= await user.save()
        res.json({
            data:result,
            message:'registered user successfully',
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

exports.module=registerController