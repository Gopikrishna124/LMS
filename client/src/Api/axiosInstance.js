import axios from "axios";


// const axiosInstance=axios.create({
//     baseURL:'http://localhost:2000'
// })

// axiosInstance.interceptors.request.use((config)=>{
//    const accessToken=JSON.parse(sessionStorage.getItem("accessToken")) 

//    if(accessToken){
//     config.headers.Authorization= `Bearer ${accessToken}`
//    }
//    return config
// },(err)=>Promise.reject(err)
// )

export const userEndPoint="http://localhost:5002/api/user"
export const mediaEndPoint="http://localhost:5002/api/media"
export const courseEndPoint="http://localhost:5002/api/course"