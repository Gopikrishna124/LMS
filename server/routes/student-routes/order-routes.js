const express=require('express')
const router=express.Router()

const {createeOrderController,capturePaymentAndFinalizePaymentController}=require('../../controllers/Student/Course/orderCourse').module

router.post('/create',createeOrderController)
router.post('/finalize',capturePaymentAndFinalizePaymentController)

exports.module=router