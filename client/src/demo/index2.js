import { mediaDelete, MediaUpload } from "@/Api/MediaServiceUpload";
import MediaProgressComponent from "@/componentpages/media-progress-bar/index.jsx";
import VideoPlayer from "@/componentpages/videoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLecture } from "@/redux/Instructor/CourseCurriculumSlice";
import { refresh } from "@/redux/Instructor/CourseCurriculumSlice";
import { changeCurriculumReduxData } from "@/redux/Instructor/CourseCurriculumSlice";


function Curriculum() {
  const dispatch=useDispatch()
  const SingleCourseFromRedux=useSelector((state)=>state.CourseDetails.singleCourse)
  const CurriculumInitialFormData=SingleCourseFromRedux?._id?SingleCourseFromRedux.curriculum:
  useSelector((state)=>state.CurriculumReduxFormData.data)
   console.log('reduxCurriclumFormData',CurriculumInitialFormData)

  const [curriculumFormData,setCurriculumFormData]=useState(CurriculumInitialFormData)

  const [mediaUploadProgress, setmediaUploadProgress] = useState(false);
  const [mediaProgressBarPercentage,setmediaProgressBarPercentage]=useState(0)


  // ,.....................................

  function handleNewLecture() {
     dispatch(addNewLecture())
  }

  // .................................
  const changeFormData = (indexs, field, value) => {
    console.log('field',field)
    console.log('value',value)

    const updatedarray = CurriculumInitialFormData.map((item, index) =>
      index === indexs ? { ...item, [field]: value } : item
    );
   dispatch(changeCurriculumReduxData(updatedarray))
  };
  //...................................................
  const changeInput = async (e, index) => {
    const selected = e.target.files[0];
    console.log("selected", e.target.files[0]);

    if (selected) {
      const videoFormData = new FormData();
      videoFormData.append("file", selected);
      console.log("videoForm", videoFormData);

      try {
        setmediaUploadProgress(true);
        const response = await MediaUpload(videoFormData,setmediaProgressBarPercentage)
        console.log("response", response);

        if (response.data.success) {
          let copyCurriculumInitialData = [...CurriculumInitialFormData];
          copyCurriculumInitialData[index] = {
            ...copyCurriculumInitialData[index],
            videoUrl: response?.data?.data?.url,
            public_id: response?.data?.data?.public_id,
          };
          dispatch(changeCurriculumReduxData(copyCurriculumInitialData));
          setmediaUploadProgress(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  console.log("curriculumData", CurriculumInitialFormData);

  //.....................................................................

  const isCourseCurriculumFormDataValid=()=>{
   return  CurriculumInitialFormData.every((item)=>{
      return (
        item && typeof item==="object" &&
        item.title.trim()!=='' && item.videoUrl.trim()!==''
      )
    })
  }

  //...................................................................................
  const handleReplaceVideo=async(index)=>{
     const copyCurriculumInitialData=[...CurriculumInitialFormData]
     const getCurrentPublicId=copyCurriculumInitialData[index].public_id
    const response=await mediaDelete(getCurrentPublicId)
    console.log('responseDelete',response)
    if(response?.data.success){
      copyCurriculumInitialData[index]={
        ...copyCurriculumInitialData[index],
        videoUrl:'',
        public_id:''
      }
     dispatch(changeCurriculumReduxData(copyCurriculumInitialData))
    }
}
// ........................................


return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>

        <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress } onClick={handleNewLecture}>Add Course</Button>
        {
          mediaUploadProgress ? <MediaProgressComponent isMediaUploading={mediaUploadProgress} progressBar={mediaProgressBarPercentage} />: null}
          <div className="mt-4 space-y-4">
          {CurriculumInitialFormData.map((curriculumItem, index) => (
            
            
            
           <div className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  onChange={(e) =>
                    changeFormData(index, e.target.id, e.target.value)
                  }
                  value={CurriculumInitialFormData[index]?.title}
                  id="title"
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onClick={(e) =>
                      changeFormData(
                        index,
                        e.target.id,
                        !CurriculumInitialFormData[index].freePreview
                      )
                    }
                    checked={curriculumItem?.freePreview}
                    id="freePreview"
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {
                  curriculumItem?.videoUrl? 
                  <div className="flex gap-3">
                       <VideoPlayer url={curriculumItem?.videoUrl} width='500px' height='300px'/>
                       <Button onClick={()=>handleReplaceVideo(index)}>Replace Video</Button>        
                       <Button className='bg-red-900'>Delete Lecture</Button>             
                    </div> :
                
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => changeInput(e, index)}
                  className="mb-4 cursor-pointer"
                />
              }
              </div>
           
            </div>
            
          ))}
        </div>
       
       
      </CardContent>
    </Card>
  );
}

export default Curriculum;
