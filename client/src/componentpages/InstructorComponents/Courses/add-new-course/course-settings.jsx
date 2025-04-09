import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { MediaUpload } from "@/Api/MediaServiceUpload";
import { useDispatch, useSelector } from "react-redux";
import { ChangeReduxLandingData } from "@/redux/Instructor/CourseLandingSlice";
import MediaProgressComponent from "@/componentpages/media-progress-bar/index.jsx";
import { Button } from "@/components/ui/button";

function Coursesettings() {
  const courseLandingInitialFormData = useSelector(
    (state) => state.CourseLanding
  );
  const dispatch = useDispatch();

  const [mediaUploadProgress, setmediaUploadProgress] = useState(false);
  const [mediaProgressBarPercentage, setmediaProgressBarPercentage] =
    useState(0);
  //..................................
  const handleUploadImageSetting = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const ImageFormData = new FormData();
      ImageFormData.append("file", selectedImage);

      try {
        setmediaUploadProgress(true);
        const response = await MediaUpload(
          ImageFormData,
          setmediaProgressBarPercentage
        );
        console.log("response", response);
        if (response.data.success) {
          dispatch(
            ChangeReduxLandingData({
              fieldChange: "images",
              ValueChange: response.data.data.url,
            })
          );
          setmediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log("courseInitialFormData", courseLandingInitialFormData);

  // useEffect(() => {
  //   dispatch(
  //     ChangeReduxLandingData({ fieldChange: "images", ValueChange: "" })
  //   );
  // }, []);

function handleReplace(){
 dispatch(ChangeReduxLandingData({
    fieldChange: "images",
    ValueChange: '',
  })
 )
}
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {mediaUploadProgress ? (
          <MediaProgressComponent
            isMediaUploading={mediaUploadProgress}
            progressBar={mediaProgressBarPercentage}
          />
        ) : null}

        {courseLandingInitialFormData?.images ? (
          <div>
            <Button className='bg-red-800 text-white m-5' onClick={handleReplace}>Replace Image</Button>
          <img className='w-[600px] h-[600px] object-cover'src={courseLandingInitialFormData.images} />
          
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleUploadImageSetting}
              className="mb-4"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Coursesettings;
