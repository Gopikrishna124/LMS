const express=require('express')
const router=express.Router()
const getAllStudentCoursesController=require('../../controllers/Student/Course/getAllCourses').module
const getSingleStudentCourseController=require('../../controllers/Student/Course/getSingleCourse').module


router.get('/studentsViewAllCourses',getAllStudentCoursesController)
router.get('/singleStudentViewCourse/:id/:studentId',getSingleStudentCourseController)


exports.module=router