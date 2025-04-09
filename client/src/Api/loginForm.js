
import axios from "axios"
import { userEndPoint } from "./axiosInstance"


const loginForm=async(formData)=>{
    const Data=await axios.post(`${userEndPoint}/login`,formData,{
        headers:{
            "Content-type":"application/json"
        },
        withCredentials:true
    })
    return Data
}

export default loginForm