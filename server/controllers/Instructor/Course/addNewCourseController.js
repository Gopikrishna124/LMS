const Course=require('../../../models/courseModel').module


const addNewCourse=async(req,res)=>{
     console.log('newCOurse',req.body)
    try {
        const newCreatedCourse=new Course(req.body)
        const result=await newCreatedCourse.save()
         if(result){
            res.json({
                data:result,
                message:'course created successfully',
                success:true,
                error:false
            })    
         }
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

exports.module=addNewCourse