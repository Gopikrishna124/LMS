import { studentBoughtCoursesService } from '@/Api/studentBoughtCourses'
import StudentHeader from '@/componentpages/StudentComponents/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { GetAllStudentBoughtCourses } from '@/redux/Student/CourseSlice'
import { Watch } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function StudentPayedCourses() {
   const userId=useSelector((state)=>state.user?.userDetails.id)
   const dispatch=useDispatch()
   const studentCourses=useSelector((state)=>state.StudentCourse?.StudentBoughtCoures?.Courses)
   const navigate=useNavigate()
   //.............................................................................
  useEffect(()=>{
    if(userId){
     const studentBoughtCourses=async()=>{
        const response=await studentBoughtCoursesService(userId)
        console.log('response',response)
        dispatch(GetAllStudentBoughtCourses(response.data.data))
     }
     studentBoughtCourses()
    }
  },[])
  return (
    <div>
      <StudentHeader/>
      <div className='p-4'>
        <h1 className='text-3xl font-bold  mb-8'>My Courses</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
           {
            studentCourses && studentCourses.length>0 ? 
            studentCourses.map((course,index)=>(
              <Card key={index} className='flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1'
               onClick={()=>navigate(`/course-progress/${course?.courseId}`)}>
                <CardContent className='p-4 flex-grow'>
                  <img src={course?.courseImage} 
                  className='h-[400px] md:h-52 w-full object-cover rounded-md mb-4'/>
                  <h3 className='text-bold text-lg'>{course?.title}</h3>
                  <p className='text-sm text-gray-500 mb-2'>{course?.instructorName}</p>
                </CardContent>
                <CardFooter>
                  <Button className='flex-1' onClick={()=>navigate(`/course-progress/${course?.courseId}`)}>
                    <Watch className='mr-2 h-4 w-4'/>
                    Start Watching
                  </Button>
                </CardFooter>
              </Card>
            ))
            :<p className='text-2xl font-bold'>No courses Found</p>
           }
        </div>
      </div>
    </div>
  )
}

export default StudentPayedCourses 