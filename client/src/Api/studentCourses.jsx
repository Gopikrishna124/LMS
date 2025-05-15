import axios from "axios";
import { studentCourseEndPoint } from "./axiosInstance";

export const  fetchStudentViewAllCoursesListService=async(query)=>{
    
    const data=await axios.get(`${studentCourseEndPoint}/studentsViewAllCourses?${query}`,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return data
}



export const  fetchSingleStudentViewCourseService=async(id,studentId)=>{
    const data=await axios.get(`${studentCourseEndPoint}/singleStudentViewCourse/${id}/${studentId}`,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return data
}