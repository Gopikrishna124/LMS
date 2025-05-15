import React, { useEffect, useState } from 'react'
import banner from '../../assets/mirror2.jpg'
import banner2 from '../../assets/BA-Courses.png'
import banner3 from '../../assets/training.jpg'
import banner4 from '../../assets/mirror.avif'
import { courseCategories } from '@/config'
import { Button } from '@/components/ui/button'
import { fetchStudentViewAllCoursesListService } from '@/Api/studentCourses'
import { useDispatch, useSelector } from 'react-redux'
import { keepAllStudentCourses } from '@/redux/Student/CourseSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'



function StudentIndexPage() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const StudentCourses=useSelector((state)=>state.StudentCourse.AllCourses)
  // console.log('studentCourses',StudentCourses)

  const studentBoughtCourses=useSelector((state)=>state.StudentCourse.StudentBoughtCoures.Courses)
  // console.log('studentBought',studentBoughtCourses)

  const [searchParams,setSearchParams]=useSearchParams()
  const[countImage,setCountImage]=useState(0)
  console.log('countImage',countImage)   
  useEffect(()=>{
     const getAllStudentsCourses=async()=>{
        try {
          const response=await fetchStudentViewAllCoursesListService()
          console.log('studentCourses',response)
          if(response.data.success){
            dispatch(keepAllStudentCourses(response.data.data))
          }
        } catch (error) {
          console.log('err',error)
        }
     }
     getAllStudentsCourses()
  },[])

  //........................................
  const checkCourse=async(courseId)=>{
    studentBoughtCourses && studentBoughtCourses.map((item)=>(
      item.courseId===courseId ? (navigate(`/course-progress/${courseId}`)) :
      (navigate(`/student/course-details/${courseId}`))
    ))
  }

  //....................................................
  const handleNavigateToCourse=async(id)=>{
  
    
    setSearchParams(new URLSearchParams(`category=${id}`))
    sessionStorage.removeItem('filters')
    const currentFilter={
      category:[id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate('/student/exploreCourses')
  
}

 //............................
 const imagesArray=[
  banner,banner2,banner3,banner4
]

//..................................
const changeImageFunction=()=>{
  //this code is not working

  // if(countImage===imagesArray.length-1){
  //   console.log('countImageinner',countImage)
  //   setCountImage(0)
  //   return
  // }
  // else{
  //   setCountImage((countImage)=>countImage+1)
  //   return
  // }
  
  setCountImage((countImage)=>{
    if(countImage===imagesArray.length-1){
      return 0
    }
    else{
      return countImage+1
    }
  })
 

}

///....................
useEffect(()=>{
   const intervalId=setInterval(()=>{
      changeImageFunction()
   },2000)

   return ()=>clearInterval(intervalId)
},[])
  
  return (
    <div className='min-h-screen bg-white'>
     <section className='flex flex-col lg:flex-row items-center justify-between
      py-8 px-4 lg:px-8'>
      <div className='lg:w-1/2 lg:pr-12 mr-2'>
         <h1 className='text-4xl font-bold mb-4'>Learning that gets you</h1>
          <p className='text-xl'>Skills for your present and your future.Get Started with us Now</p>
      </div>
      <div className='lg:w-full mb-8 lg:mb-0 lg:h-[450px] overflow-hidden'>
       {
        imagesArray.map((item)=>(
          <img src={imagesArray[countImage]}  className='w-full h-[450px] rounded-lg shadow-lg object-fill'/>
        ))
       }
       
      </div>
     </section>
     <section className='py-8 px-4 lg:px-8 bg-gray-100'>
       <h2 className='text-2xl font-bold mb-6'>Course Categories</h2>      
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            courseCategories.map((item)=>(
              <Button
            onClick={()=>handleNavigateToCourse(item.id)} className='font-semibold' variant='outline' key={item.id}>{item.label}</Button>
            ))
          }
       </div>
     </section>
      
      <section className='py-12 px-4 lg:px-8'>
      <h2 className='text-2xl font-bold mb-6'>Featured Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            StudentCourses && StudentCourses.length>0 ?
            StudentCourses.map((course,index)=>(
              <div key={index} onClick={()=>checkCourse(course._id)}className='border rounded-lg shadow overflow-hidden
              cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1'>
                 <div>
                <img src={course?.images} className='w-full h-[200px] object-cover'/>
                 </div>
                 <div className='p-4'>
                   <h3 className='font-bold mb-2'>{course?.title}</h3>
                    <p className='text-sm text-gray-700 mb-2'>{course?.instructorName}</p>
                    <p className='text-[16px] font-bold'>${course?.pricing}</p>
                  </div>
              </div>
            ))
            :<h1>No Courses Found</h1>
          }
        </div>   
      </section>
    </div>
  )
}

export default StudentIndexPage