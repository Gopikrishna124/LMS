import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DollarSign, Users } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

function InstructorDashboardComponent() {

  const AllCoursesLists=useSelector((state)=>state.CourseDetails.allCourses)
  console.log('AllCoursesList',AllCoursesLists)

    //................................
    const CalculateTotalStudentsAndProfit=()=>{
      const{totalStudents,totalProfit,StudentList}=AllCoursesLists.reduce((acc,course)=>{
          const studentCount=course.students.length
           acc.totalStudents+=studentCount
           acc.totalProfit+=course.pricing*studentCount
  
           course.students.forEach((student)=>{
            acc.StudentList.push({
              courseTitle:course?.title,
              studentName:student?.studentName,
              studentEmail:student?.studentEmail
            })
           })
           return acc;
      },{totalStudents:0,totalProfit:0,StudentList:[]})
  
      return {
        totalStudents,totalProfit,StudentList
      }
    }
    console.log(CalculateTotalStudentsAndProfit())

    //......................................................
  const config=[
    {
      icon:Users,
      label:'Total Students',
      value:CalculateTotalStudentsAndProfit().totalStudents
    },
    {
      icon:DollarSign,
      label:'Total Revenue',
      value:CalculateTotalStudentsAndProfit().totalProfit
    }
  ]


  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-8'>
        {
          config.map((item,index)=>(
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {item?.label}
                </CardTitle>
                <item.icon className='h-4 w-4 text-muted-foreground'/>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{item.value}</div>
              </CardContent>
            </Card>
          ))
        }
      
      </div>
      <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Table className='w-full'>
              <TableHeader>
        <TableRow>
          <TableHead>Course Name</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Student Email</TableHead>
      
        </TableRow>
      </TableHeader>
      <TableBody>
        {CalculateTotalStudentsAndProfit().StudentList.map((studentItem,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{studentItem.courseTitle}</TableCell>
            <TableCell>{studentItem.studentName}</TableCell>
            <TableCell>{studentItem.studentEmail}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}


export default InstructorDashboardComponent