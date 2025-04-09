import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate } from "react-router-dom"




const ProtectedRoute=({children})=>{

    
   const location=useLocation()
   const navigate=useNavigate()
      
   const userDetails=useSelector((state)=>state.user.userDetails)

   console.log('protectedDetails',userDetails)


     useEffect(()=>{

      
        if(!userDetails){

          navigate('/login')
        }
         
         if(userDetails && userDetails.role!=='instructor' && location.pathname.includes('instructor')){
            navigate('/')
         }
         if(userDetails && userDetails.role==='instructor' && !location.pathname.includes('instructor')){
          navigate('/instructor')
        }

     },[])  

   return(
    <>
    {children}
    </>
   )
}

export default ProtectedRoute