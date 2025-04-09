import axios from "axios";
import React from "react";
import { userEndPoint } from "./axiosInstance";


const registerApi=async(data)=>{
    
    const responseData=await axios.post(`${userEndPoint}/register`,data,{
        headers:{
            'Content-type':'application/json'
        },
        withCredentials:true
    })

    return responseData
}

export default registerApi 
 