import axios from "axios"
import { mediaEndPoint } from "./axiosInstance"


export const MediaUpload=async(formData,onProgressCallback)=>{
   const data=await axios.post(`${mediaEndPoint}/upload`,formData,{
    headers:{
        'Content-type':'Application/json'
    },
    withCredentials:true,
   
   onUploadProgress:(ProgressEvent)=>{
    const  percentCompleted=Math.round((ProgressEvent.loaded * 100)/ProgressEvent.total);
    onProgressCallback(percentCompleted)
   }
})
   return data
}


export const mediaDelete=async(publicId)=>{
   const data=await axios.delete(`${mediaEndPoint}/delete/${publicId}`)
   return data
}

export const MediaBulkUpload=async(formData,onProgressCallback)=>{
   const data=await axios.post(`${mediaEndPoint}/bulk-upload`,formData,{
    headers:{
        'Content-type':'Application/json'
    },
    withCredentials:true,
   
   onUploadProgress:(ProgressEvent)=>{
    const  percentCompleted=Math.round((ProgressEvent.loaded * 100)/ProgressEvent.total);
    onProgressCallback(percentCompleted)
   }
})
   return data
}
