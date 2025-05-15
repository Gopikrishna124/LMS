const express=require('express')
const router=express.Router()

const {getCurrentCourseProgress,markCurrentLectureAsViewed,ResetCourseProgress}=require('../../controllers/Student/CourseProgress/CourseProgress').module

router.get('/get/:userId/:courseId',getCurrentCourseProgress)
router.post('/mark-lecture-viewed',markCurrentLectureAsViewed)
router.post('/reset-progress',ResetCourseProgress)


exports.module=router