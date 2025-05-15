const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");

const cookieParser=require('cookie-parser')
const app = express();
const port = process.env.PORT || 2001
const Connection = require("./utils/db").module;

const userRouter=require('./routes/userRoutes').module
const mediaRouter=require('./routes/instructor-routes/media-routes').module
const courseRouter=require('./routes/instructor-routes/course-routes').module 
const studentRouter=require('./routes/student-routes/course-routes').module //studentView courses 
const orderRouter=require('./routes/student-routes/order-routes').module
const studentBoughtCoursesRouter=require('./routes/student-routes/student-Bought-routes').module
const studentProgressCourseRouter=require('./routes/student-routes/student-progress-routes').module


app.use(cors({
 origin: process.env.CLIENT_URL,
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())



//routes//
app.use('/api/user',userRouter)
app.use('/api/media',mediaRouter)
app.use('/api/course',courseRouter) //instructor routes

app.use('/api/student/course',studentRouter)//student view courses
app.use('/api/student/order',orderRouter)

//student boughtcourses
app.use('/api/student/bought',studentBoughtCoursesRouter)

//student progress
app.use('/api/student/progress',studentProgressCourseRouter)

app.listen(port, () => {
  Connection();
  console.log(`app listening on server ${port}`);
});
