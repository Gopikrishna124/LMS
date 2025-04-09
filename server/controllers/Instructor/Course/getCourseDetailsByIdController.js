const Course=require('../../../models/courseModel').module
const mongoose=require('mongoose')


const getCourseDetailsById=async(req,res)=>{
     const id=req.params.id
    try {
       if(!id){
        throw new Error('course Id is required')
       }
       const SingleCourse=await Course.findById(id)
       if(!SingleCourse){
        throw new Error('course not found')
       }
       res.json({
        data:SingleCourse,
        message:'courseDetails fetched successfully',
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

exports.module=getCourseDetailsById