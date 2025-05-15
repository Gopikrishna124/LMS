const mongoose=require('mongoose')
const {Schema}=mongoose


const orderSchema=new Schema({
  userId:String,
  userName:String,
  userEmail:String,
  orderStatus:String,
  paymentMethod:String,
  paymentStatus:String,
  orderDate:Date,
  paymentId:String,
  payerId:String,
  instructorId:String,
  instructorName:String,
  courseImage:String,
  courseTitle:String,
  courseId:String,
  coursePricing:String

})

const Order=mongoose.model('Order',orderSchema)
exports.module=Order