import axios from "axios"
import { studentBoughtCourseEndPoint } from "./axiosInstance"


export const studentBoughtCoursesService=async(studentId)=>{
    const response=await axios.get(`${studentBoughtCourseEndPoint}/studentBoughtCourses/${studentId}`,{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
    })
    return response
}