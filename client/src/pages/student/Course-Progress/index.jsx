import { studentProgressCourseService, studentProgressResetService, studentProgressViewedService } from '@/Api/studentPorgressCourses'
import VideoPlayer from '@/componentpages/videoPlayer'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, ChevronLeft, ChevronRight, X,Play } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function StudentCourseProgress() {
   const navigate=useNavigate()
   const {id}=useParams()
   const userId=useSelector((state)=>state.user.userDetails.id)
   const [courseProgress,setCourseProgress]=useState({})
   const[lockCourse,setLockCourse]=useState(false) //if user didnot buy the course
   const[currentLecture,setCurrentLecture]=useState(null)
   const[showCourseCompleteDialog,setShowCompleteDialog]=useState(false)
   const[showConfetti,setShowConfetti]=useState(false)
   const [sideBarOpen,setSideBarOpen]=useState(false)
  

   
   //................................
   const fetchCurrentCourseProgress=async()=>{
    const response=await studentProgressCourseService(userId,id)
    console.log('response',response)
    if(response?.data?.success){
       if(response.data.data.isPurchased==false){
           setLockCourse(true)
       }
       else{
           setSideBarOpen(true)
           setCourseProgress({
               courseDetails:response.data.data.courseDetails,
               progress:response.data.data.progress
           })
           if(response.data.data.completed){
               setCurrentLecture(response.data.data.courseDetails.curriculum[0])
               setShowCompleteDialog(true)
               setShowConfetti(true)
               return //important  to use return here else it will go down and setCurrentLecture as morethan curriuclum
                //lectures index          
           }
           if(response.data.data.progress.length===0){
             setCurrentLecture(response.data.data.courseDetails.curriculum[0])
           }
           else{
              console.log('logging here')
              const lastIndex=response?.data.data.progress.reduceRight((acc,obj,index)=>{
                 return acc==-1 && obj.viewed==true ?index:acc
              },-1)
              setCurrentLecture(response?.data?.data?.courseDetails?.curriculum[lastIndex +1])
           } 
           

       }
    }
 }

   useEffect(()=>{
     
      if(id){
        fetchCurrentCourseProgress()
      }
   },[id])

   //......................................................
   useEffect(()=>{
     showConfetti && setTimeout(()=>{
        setShowConfetti(false)
     },4000)
   },[showConfetti])

   console.log('currentLecture',currentLecture)
//................................................................
   useEffect(()=>{
    const updateCourseProgress=async()=>{
      if(currentLecture){
        const response=await studentProgressViewedService(userId,id,currentLecture?._id)
        console.log('progressUpdate',response)
        if(response?.data.success){
          fetchCurrentCourseProgress()
        }
      }
    }
      if(currentLecture?.progressValue===1){
        updateCourseProgress()
      }
   },[currentLecture])

  
   //............................................................
   const hadleRewatchCourse=async()=>{
      const response=await studentProgressResetService(userId,id)
      console.log('response',response)
      if(response?.data.success){
        setCurrentLecture(null)
        setShowCompleteDialog(false)
        setShowConfetti(false)
        fetchCurrentCourseProgress()
      }
   }
  return (
    <div>
        {
          showConfetti && <ReactConfetti/>
        }
        <div className='flex flex-col h-screen  bg-[#1c1d1f] text-white'>
          <div className='flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700'>
             <div className='flex items-center space-x-4'>
               <Button onClick={()=>navigate('/studentPayed-courses')} className='bg-white text-black' variant='ghost' size='sm'>
                <ChevronLeft className='h-4 w-4 mr-2'/>
                Back to my Courses Pages
               </Button>
               <h1 className='text-lg font-bold hidden md:block'>{courseProgress?.courseDetails?.title}</h1>
             </div>
             <Button onClick={()=>setSideBarOpen(!sideBarOpen)}>
               {
                sideBarOpen?<ChevronRight/> :<ChevronLeft/>
               }
             </Button>

          </div>
          <div className='flex  flex-1 overflow-hidden'>
            <div className={`flex-1  transition-all duration-300`} onClick={()=>setSideBarOpen(false)}>
                <VideoPlayer
                width='100%'
                height='500px'
                url={currentLecture?.videoUrl}
                onProgressUpdate={setCurrentLecture} //sending this to videoPlayer to add property to 
                          //currentLecure like progressValue  to 1 if video is completed
                progressData={currentLecture}
                />
                <div className='p-6 bg-[#1c1d1f]'>
                 <h2 className='text-2xl font-bold mb-2'>{currentLecture?.title}</h2>
                </div>
            </div>
            <div className={`fixed top-[70px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-2 border-gray-800 transition-all duration-300
              ${sideBarOpen ?'translate-x-0':'translate-x-full'}`}>
          
              <Tabs defaultValue='content' className='flex flex-col mt-3'>
               <TabsList className='w-full grid grid-cols-2 h-14'>
                <TabsTrigger value='content' className=' rounded-none h-full'>Course Content</TabsTrigger>
                <TabsTrigger  value='overview' className=' rounded-none h-full'>Overview</TabsTrigger>
               </TabsList>
               <TabsContent value='content'>
                  <ScrollArea className='h-full'>
                    <div className='p-4 space-y-4'>
                      {
                        courseProgress?.courseDetails?.curriculum.map((item,index)=>( 
                          <div key={index} className='flex items-center text-sm font-bold cursor-pointer'>
                            {
                            courseProgress?.progress?.find((Progressitem)=>Progressitem.lectureId===item._id)
                             ?.viewed? (<Check className='h-4 w-4 text-green-500'/>):(<Play className='h-4 w-4'/>)        
                            }
                            <span>{item?.title}</span>
                          </div>
                        ))
                      }
                    </div>
                  </ScrollArea>
               </TabsContent>
               <TabsContent value='overview'>
                 <ScrollArea className='h-full'>
                    <div>
                      <h2 className='text-xl font-bold mb-4'>About this course</h2>
                      <p className='text-gray-500'>{courseProgress?.courseDetails?.description}</p>
                    </div>
                 </ScrollArea>
               </TabsContent>
              </Tabs>
            </div>
          </div>
          <Dialog open={lockCourse}>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>You can't view this page</DialogTitle>
                <DialogDescription>Please purchase this course to access</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog open={showCourseCompleteDialog}>
            <DialogContent className='sm:max-w-[425px]'> 
               <DialogHeader>
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogDescription className='flex flex-col gap-3'>
                    <Label>You have completed the course</Label>
                    <div className='flex flex-row gap-3'>
                      <Button onClick={()=>navigate('/studentPayed-courses')}>My Courses Page</Button>
                      <Button onClick={hadleRewatchCourse}>Rewatch Course</Button>
                    </div>
                </DialogDescription>
               </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default StudentCourseProgress