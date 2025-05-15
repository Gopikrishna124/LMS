import axios from "axios";
import { paymentCourseEndPoint } from "./axiosInstance";


export const PaymentCourseService=async(paymentData)=>{
    const data=await axios.post(`${paymentCourseEndPoint}/create`,paymentData,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return data
}

export const CapturePaymentServcie=async(payerId,paymentId,orderId)=>{
    const data=await axios.post(`${paymentCourseEndPoint}/finalize`,{payerId,paymentId,orderId},{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    return data
}