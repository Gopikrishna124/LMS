import InstructorCourses from '@/componentpages/InstructorComponents/Courses/Courses'
import InstructorDashboardComponent from '@/componentpages/InstructorComponents/Dashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { LogOutUser } from '@/redux/authSlice'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCoursesList } from '@/Api/instructorCourses'
import { SetALLCourses } from '@/redux/Instructor/CourseDetails'

function InstructorDashboardPage() {

  const [activeTab,setActiveTab]=useState('dashboard')
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const AllCoursesLists=useSelector((state)=>state.CourseDetails.allCourses)
  console.log('AllCoursesList',AllCoursesLists)
  
  const menuItems=[
    {
      icon:BarChart,
      label:'DashBoard',
      value:'dashboard',
      component:<InstructorDashboardComponent/>
    },
    {
      icon:Book,
      label:'Courses',
      value:'courses',
      component:<InstructorCourses listOfCourses={AllCoursesLists}/>
    },
    {
      icon:LogOut,
      label:'LogOut',
      value:'logout',
      component:null
    }
  ]
//  ...........................................

  const handleLogOut=async()=>{
   dispatch(LogOutUser())
   
   Cookies.remove('portalToken')
   navigate('/login')
  }

  //.............................................................
   useEffect(()=>{
    const fetchAllCoursesSaved=async()=>{

      const response=await fetchInstructorCoursesList()
      console.log('coursesList',response)
      if(response.data.success){
        dispatch(SetALLCourses(response?.data?.data))
      }
    }
    fetchAllCoursesSaved()
  },[AllCoursesLists?.length])

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='w-64 bg-white shadow-md hidden md:block'>
          <div className='p-4'>
            <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
             <nav>
              {
                menuItems.map((item,index)=>(
                  <div key={index}>
                   <Button  className='w-full justify-start mb-2' key={item.value}
                    variant={activeTab===item.value ?"secondary" :"ghost"} onClick={item.value==='logout' ? handleLogOut : 
                    ()=>setActiveTab(item.value)
                   }>
                   
                   <item.icon className='h-4 w-4 mr-2'/>
                     {item.label} 
                   </Button>
                  </div>
                   
                   
                ))
              }
             </nav>
          </div>
      </aside>

      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-3xl font-bold '>Dashboard</h1>
          <Tabs value={activeTab} defaultValue='dashboard' onValueChange={setActiveTab}>
            {
              menuItems.map((item,index)=>(
                <TabsContent value={item.value} key={index}>
                 {
                  item.component!==null ? item.component :null
                 }
                </TabsContent>
              
              ))
            }
          </Tabs>
        </div>
      </main>
      
    </div>
  )
}

export default InstructorDashboardPage