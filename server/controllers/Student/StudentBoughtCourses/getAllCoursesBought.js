const StudentCourses=require('../../../models/studentPayedCoursesModel').module

const getStudentCoursesByUserId=async(req,res)=>{
   const {studentId}=req.params
   console.log('studentId',studentId)
    try {
        if(!studentId){
            throw new Error('studentId is required')
        }
        const AllUserCourses=await StudentCourses.findOne({userId:studentId})
        // console.log('AlluserCourse',AllUserCourses)
         
        res.json({
            data:AllUserCourses,
            success:true,
            error:false,
            message:'All student courses fetched successfully'
        })
        
    } catch (error) {
        res.json({
            message:error.message || error,
            success:true,
            error:false
        })
    }

}

exports.module=getStudentCoursesByUserId