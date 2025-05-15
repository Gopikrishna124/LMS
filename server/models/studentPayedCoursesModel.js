const mongoose=require('mongoose')
const {Schema}=mongoose


const StudentPayedCoursesSchema=new Schema({
   userId:String,
   Courses:[
      {
        courseId:String,
        instructorId:String,
        instructorName:String,
        dateOfPurchase:Date,
        courseImage:String,
        title:String
      }
   ]
})

const StudentCourses=mongoose.model('StudentCourses',StudentPayedCoursesSchema)
exports.module=StudentCourses