const express=require('express')
const router=express.Router()
const addCourseController=require('../../controllers/Instructor/Course/addNewCourseController').module
const getAllCoursesController=require('../../controllers/Instructor/Course/getCourseDetailsController').module
const getSingleCourseController=require('../../controllers/Instructor/Course/getCourseDetailsByIdController').module
const updateCourseController=require('../../controllers/Instructor/Course/updateCourseController').module


router.post('/addCourse',addCourseController)
router.get('/allCourses',getAllCoursesController)
router.get('/details/:id',getSingleCourseController)
router.put('/updateCourse/:id',updateCourseController)

exports.module=router