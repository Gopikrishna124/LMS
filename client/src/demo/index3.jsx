import FormControls from "@/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { ChangeReduxLandingData } from "@/redux/Instructor/CourseLandingSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseLanding() {
  // const [courseLandingInitialFormData,setCourseLandingInitialFormData]=useState({})

   const SingleCourseFromRedux=useSelector((state)=>state.CourseDetails.singleCourse)
  const courseLandingInitialFormData =SingleCourseFromRedux?._id?SingleCourseFromRedux: useSelector(
    (state) => state.CourseLanding
  );

  console.log("courseLandingInitialFormData", courseLandingInitialFormData);
  const dispatch = useDispatch();

  const changeCourseLandingData = (e, field) => {
    // setCourseLandingInitialFormData((prev)=>{
    //   return {
    //     ...prev,
    //     [field]:e.target.value
    //   }
    // })
    dispatch(
      ChangeReduxLandingData({
        fieldChange: `${field}`,
        ValueChange: e.target.value,
      })
    );
  };

  const reduxState = useSelector((state) => state.CourseLanding);
  console.log("reduxState", reduxState);

  //...............................................
  const moveToNextRef = (e) => {
    if (e.key === "Enter") {
      e.preventDefault("");
    }
  };

  //........................................
  const changeSelectData = (field, e) => {
    console.log("select", e);
    dispatch(
      ChangeReduxLandingData({ fieldChange: `${field}`, ValueChange: e })
    );
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingInitialFormData}
            setFormData={changeCourseLandingData}
            moveToNextRef={moveToNextRef}
            changeSelect={changeSelectData}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CourseLanding;
