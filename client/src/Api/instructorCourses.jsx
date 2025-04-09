import axios from 'axios'
import {courseEndPoint} from './axiosInstance'

console.log('Api',`${courseEndPoint}/addCourse`)

 export const addNewInstructorCourse=async(data)=>{
    const responseData=await axios.post(`${courseEndPoint}/addCourse`,data,{
    
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return responseData
}


 export const fetchInstructorCoursesList=async()=>{
    const responseData=await axios.get(`${courseEndPoint}/allCourses`,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return responseData
}



 export const fetchSingleCourseDetails=async(id)=>{
    const responseData=await axios.get(`${courseEndPoint}/details/${id}`,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
 return responseData
}

 export const updateCourseDetails=async(id,data)=>{
    const responseData=await axios.put(`${courseEndPoint}/updateCourse/${id}`,data,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return responseData
}

