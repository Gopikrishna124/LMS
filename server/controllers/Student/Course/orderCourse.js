
const Order=require('../../../models/orderModel').module
const paypal=require('../../../helpers/paypal').module
const Course=require('../../../models/courseModel').module
const StudentCourses=require('../../../models/studentPayedCoursesModel').module

const  createeOrderController=async(req,res)=>{
   try {
     const{
        userId,
        userName,
        userEmail,
        orderStatus,
       paymentMethod,
       paymentStatus,
        orderDate,
        paymentId,
        payerId,
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
        courseId,
        coursePricing
     }=req.body

     const create_payment_json={
        intent:'sale',
        payer:{
            payment_method:'paypal'
        },
        redirect_urls:{
            return_url:`${process.env.CLIENT_URL}/payment-return`,
            cancel_url:`${process.env.CLIENT_URL}/payment-cancel`
            
        },
        transactions:[
            {
                items_List:{
                    items:[
                        {
                            name:courseTitle,
                            sku:courseId,
                            pricing:coursePricing,
                            currency:'USD',
                            quantity:1
                        }
                    ]
                },
                amount:{
                    currency:'USD',
                    total:coursePricing.toFixed(2)
                },
                description:courseTitle
            }
        ]
     }
     paypal.payment.create(create_payment_json,async(err,paymentInfo)=>{
        if(err){
            res.json({
                message:err.message || err,
                success:false,
                error:true
            })
        }
        else{
            //checking if course is bought by user or not
            
            // const AlreadyBoughtCourse=await StudentCourses.findOne({userId:userId}) 
            // console.log('AlreadyBoughtCourse',AlreadyBoughtCourse)
            // if(AlreadyBoughtCourse){
            //   const existingCourse= AlreadyBoughtCourse?.Courses?.find((item)=>item.courseId===courseId)
            //    if(existingCourse){
            //     res.json({
            //         message:'student already bought the course',
            //         error:true,
            //         success:false
            //     })
            //    }
            // }
               
                const newlyCreatedOrder=new Order({
                    userId,
                    userName,
                    userEmail,
                    orderStatus,
                   paymentMethod,
                   paymentStatus,
                    orderDate,
                    paymentId,
                    payerId,
                    instructorId,
                    instructorName,
                    courseImage,
                    courseTitle,
                    courseId,
                    coursePricing
                })
                const result=await newlyCreatedOrder.save()
                const approveUrl=paymentInfo.links.find((link)=>link.rel=='approval_url').href
                if(!approveUrl){
                    throw new Error('something went wrong while doing payment')
                }
                res.json({
                    data:{
                     approveUrl,
                     orderId:result._id
                    },
                    success:true,
                    error:false,
                    
                })
               
            
           
        

        }
     })
   } catch (error) {
    res.json({
        message:error.message || error,
        success:false,
        error:true
    })
   }
}

const capturePaymentAndFinalizePaymentController=async(req,res)=>{
   try {
     const {payerId,paymentId,orderId}=req.body
     console.log(payerId,paymentId,orderId)
     const order=await Order.findById(orderId)
     if(!order){
        throw new Error('order cannot be found')
     }
     order.paymentStatus='paid',
     order.orderStatus='confirmed'
     order.payerId=payerId,
     order.paymentId=paymentId

     await order.save()

     //update studentBoughtCourses model
     const ExistingstudentCourses=await StudentCourses.findOne({userId:order.userId})
     if(ExistingstudentCourses){
       
         ExistingstudentCourses.Courses.push({
            courseId:order.courseId,
            instructorId:order.instructorId,
            instructorName:order.instructorName,
            dateOfPurchase:order.orderDate,
            courseImage:order.courseImage,
            title:order.courseTitle
         })

         await ExistingstudentCourses.save()
         
     }
     else{
        const newlyStudentBuyingCourse=new StudentCourses({
            userId:order.userId,
            Courses:[
                {
                    courseId:order.courseId,
                    instructorId:order.instructorId,
                    instructorName:order.instructorName,
                    dateOfPurchase:order.orderDate,
                    courseImage:order.courseImage,
                    title:order.courseTitle
                }
            ]
        })
        await newlyStudentBuyingCourse.save()

    }

    //update studentsOpted in courseModel
    // const FindCourse=await Course.findById(order.courseId)
    // if(!FindCourse){
    //     throw new Error('something went wrong while updating student in courseModle')
    // }
    // FindCourse.students.push({
    //     studentId:order.userId,
    //     studentName:order.userName,
    //     studentEmail:order.userEmail,
    //     payedAmount:order.coursePricing
    // })
   const FindCourse=await Course.findByIdAndUpdate(order.courseId,{
    $addToSet:{
        students:{
             studentId:order.userId,
             studentName:order.userName,
             studentEmail:order.userEmail,
              payedAmount:order.coursePricing,
                }
            }
   })
    await FindCourse.save()

    res.json({
        data:order,
        success:true,
        error:false,
        message:'order confirmed'
    })
   } catch (error) {
    res.json({
        message:error.message || error,
        success:false,
        error:true
    })
   }
}
exports.module={createeOrderController,capturePaymentAndFinalizePaymentController}