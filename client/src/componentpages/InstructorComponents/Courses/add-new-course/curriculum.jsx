import { MediaBulkUpload, mediaDelete, MediaUpload } from "@/Api/MediaServiceUpload";
import MediaProgressComponent from "@/componentpages/media-progress-bar/index.jsx";
import VideoPlayer from "@/componentpages/videoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewLecture } from "@/redux/Instructor/CourseCurriculumSlice";
import { changeCurriculumReduxData } from "@/redux/Instructor/CourseCurriculumSlice";
import { useParams } from "react-router-dom";
import { Upload } from "lucide-react";

function Curriculum() {
  const dispatch=useDispatch()
 
  const CurriculumInitialFormData=useSelector((state)=>state.CurriculumReduxFormData.data)
  console.log('curriculumINitial',CurriculumInitialFormData)
  const [curriculumFormData,setCurriculumFormData]=useState(CurriculumInitialFormData&& CurriculumInitialFormData)
  console.log('curriculumFormDAta',curriculumFormData)
  const [mediaUploadProgress, setmediaUploadProgress] = useState(false);
  const [mediaProgressBarPercentage,setmediaProgressBarPercentage]=useState(0)
  const params=useParams().id
  const bulkUploadInputRef=useRef()

  function handleNewLecture() {

     setCurriculumFormData((prev)=>{
      return(
        [
          ...prev,
          {
          title:'',
          freePreview:'',
          videoUrl:'',
          public_id:''
          }
        ]
      )
     })
     dispatch(addNewLecture())
  }

  // .................................
  const changeFormData = (indexs, field, value) => {
    console.log('field',field)
    console.log('value',value)

    const updatedarray = CurriculumInitialFormData.map((item, index) =>
      index === indexs ? { ...item, [field]: value } : item
    );
    setCurriculumFormData(updatedarray)
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
          let copyCurriculumInitialData = [...curriculumFormData];
          copyCurriculumInitialData[index] = {
            ...copyCurriculumInitialData[index],
            videoUrl: response?.data?.data?.url,
            public_id: response?.data?.data?.public_id,
          };
          setCurriculumFormData(copyCurriculumInitialData)
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
   return  curriculumFormData.every((item)=>{
      return (
        item && typeof item==="object" &&
        item.title.trim()!=='' && item.videoUrl.trim()!==''
      )
    })
  }

  //...................................................................................
  const handleReplaceVideo=async(index)=>{
     const copyCurriculumInitialData=[...curriculumFormData]
     const getCurrentPublicId=copyCurriculumInitialData[index].public_id
    const response=await mediaDelete(getCurrentPublicId)
    console.log('responseDelete',response)
    if(response?.data.success){
      copyCurriculumInitialData[index]={
        ...copyCurriculumInitialData[index],
        videoUrl:'',
        public_id:''
      }
      setCurriculumFormData(copyCurriculumInitialData)
     dispatch(changeCurriculumReduxData(copyCurriculumInitialData))
    }
}

//...........................................................
const deleteLecture=async(itemIndex)=>{
   console.log('clicked',itemIndex)
 const filteredItems= curriculumFormData.filter((item,index)=>(
     index!==itemIndex
   ))
   console.log('filteredItems',filteredItems)
   setCurriculumFormData(filteredItems)
   dispatch(changeCurriculumReduxData(filteredItems))
}

//............................................................
function areAllCourseCurriculumFormDataObjectsEmpty(arr){
    
  return  arr.every((obj)=>{
    return Object.entries(obj).every(([keyframes,value])=>{
      if(typeof value==='boolean'){
        return true //giving always true for freePreview
      }
      return value===''
    })
  })
}

//................................................................
const handleBulkUploadDialog=async()=>{
 
   bulkUploadInputRef.current?.click()
}

//...................................................................
const handleMediaBulkUpload=async(e)=>{
  console.log('files',e.target.files)

 const FilesList=Array.from(e.target.files)
 console.log('filesList',FilesList)
  const bulkFormData=new FormData()

//  FilesList.map((item)=>bulkFormData.append('files',item))
//  console.log('bulkData',FilesList)
FilesList.forEach((fileItem) => bulkFormData.append("files", fileItem));
 console.log('selected',FilesList)
 try{
  setmediaUploadProgress(true);
  const response=await MediaBulkUpload(bulkFormData,setmediaProgressBarPercentage)
  console.log('bulkUpload',response)
  if(response.data.success){
    let copyCurriculumInitialData=areAllCourseCurriculumFormDataObjectsEmpty(curriculumFormData)
    ?[]:[...curriculumFormData]
    copyCurriculumInitialData=[
      ...copyCurriculumInitialData,
       ...response.data.data.map((item,index)=>(
        {
        videoUrl:item?.url,
        public_id:item?.public_id,
        title:`Lecture ${copyCurriculumInitialData.length+(index+1)}`,
        freePreview:false
       }
      ))

    ]

    console.log('copyCurriculumInitialData',copyCurriculumInitialData)
    setCurriculumFormData(copyCurriculumInitialData)
    dispatch(changeCurriculumReduxData(copyCurriculumInitialData))
   
  
    setmediaUploadProgress(false)
  }

 }
 catch(error){

 }
}

useEffect(()=>{
  if(CurriculumInitialFormData){
    setCurriculumFormData(CurriculumInitialFormData)
  }
},[CurriculumInitialFormData])



return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input 
          type='file'
          ref={bulkUploadInputRef}
          accept='video/*'
          multiple
          className='hidden'
          id='bulk-media-upload'
          onChange={(e)=>handleMediaBulkUpload(e)}
          />
          <Button as='label' htmlFor='bulk-media-upload' variant='outline' className='cursor-pointer'
           onClick={handleBulkUploadDialog}>
            <Upload className="w-4 h-5 mr-2"/>
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>

        <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress } onClick={handleNewLecture}>Add Course</Button>
        {
          mediaUploadProgress ? <MediaProgressComponent isMediaUploading={mediaUploadProgress} progressBar={mediaProgressBarPercentage} />: null}
          <div className="mt-4 space-y-4">
          {curriculumFormData.map((curriculumItem, index) => (
            
            
            
           <div className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  onChange={(e) =>
                    changeFormData(index, e.target.id, e.target.value)
                  }
                  value={curriculumFormData[index]?.title}
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
                        !curriculumFormData[index].freePreview
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
                       <Button className='bg-red-900' onClick={()=>deleteLecture(index)}>Delete Lecture</Button>             
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
