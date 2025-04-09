const Course=require('../../../models/courseModel').module



const getCourseDetails=async(req,res)=>{
     
    try {
       const CoursesList=await Course.find({})
       res.json({
        data:CoursesList,
        message:'all courses fetched successfully',
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

exports.module=getCourseDetails