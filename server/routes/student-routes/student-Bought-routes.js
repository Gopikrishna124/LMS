const express=require('express')
const router=express.Router()
const studentBoughtCoursesController=require('../../controllers/Student/StudentBoughtCourses/getAllCoursesBought').module


router.get('/studentBoughtCourses/:studentId',studentBoughtCoursesController)
exports.module=router