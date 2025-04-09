import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableCaption, TableHead, TableHeader, TableRow,TableBody,TableCell } from '@/components/ui/table'
import { refresh } from '@/redux/Instructor/CourseCurriculumSlice'
import { Delete, Edit } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function InstructorCourses({listOfCourses}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
     dispatch(refresh())
  },[])
  return (
    <Card>
      <CardHeader className='flex justify-between flex-row items-center'>
         <CardTitle className='text-3xl font-extrabold'>All Courses</CardTitle>
         <Button className='p-6' onClick={()=>navigate('/instructor/create-new-course')}>Create A New Course</Button>
       </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
           <Table>
             <TableCaption>A list of your recent invoices</TableCaption>
             <TableHeader>
               <TableRow>
               <TableHead>Course</TableHead>
               <TableHead>Students</TableHead>
               <TableHead>Revenue</TableHead>
               <TableHead className="text-right">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
                 {
                  listOfCourses && listOfCourses.length>0 ? 
                  listOfCourses.map((course)=>(
                    <TableRow>
                    <TableCell>{course?.title}</TableCell>
                   <TableCell>{course?.students?.length}</TableCell>
                   <TableCell>${course?.pricing}</TableCell>
                   <TableCell className="text-right">
                      <Button variant='ghost' size='sm' onClick={()=>navigate(`/instructor/edit-course/${course?._id}`)}>
                        <Edit className='h-6 w-6' />
                      </Button>
                      <Button variant='ghost' size="sm">
                        <Delete/>
                      </Button>
                   </TableCell>
                  </TableRow>
                  )) : <p className='text-center m-5 text-lg'>No Courses Available Yet</p>              
                }
            
           
             </TableBody>
           </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default InstructorCourses