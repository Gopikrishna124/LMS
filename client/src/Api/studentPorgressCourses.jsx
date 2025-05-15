import axios from "axios"
import { studentProgressCourseEndPoint } from "./axiosInstance"


export const studentProgressCourseService=async(userId,courseId)=>{
    
    const response=await axios.get(`${studentProgressCourseEndPoint}/get/${userId}/${courseId}`,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return response
}


export const studentProgressViewedService=async(userId,courseId,lectureId)=>{
    
    const response=await axios.post(`${studentProgressCourseEndPoint}/mark-lecture-viewed`,{userId,courseId,lectureId},{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return response
}


export const studentProgressResetService=async(userId,courseId)=>{
    
    const response=await axios.post(`${studentProgressCourseEndPoint}/reset-progress`,{userId,courseId},{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return response
}