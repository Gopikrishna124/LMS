const Course=require('../../../models/courseModel').module



const updateCourse=async(req,res)=>{
     const id=req.params.id
     const updatedBody=req.body
    try {
       if(!id){
        throw new Error("id is required")
       }       

       const updatedCourse=await Course.findByIdAndUpdate(id,updatedBody,{new:true})

       if(!updatedCourse){
        throw new Error('something wrong while updating course')
       }

       res.json({
        data:updateCourse,
        message:'course updated successfully',
        success:true,
        error:false
       })

       
    } catch (error) {
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}

exports.module=updateCourse