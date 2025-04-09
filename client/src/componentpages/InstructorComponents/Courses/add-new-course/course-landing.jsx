import FormControls from "@/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { ChangeReduxLandingData } from "@/redux/Instructor/CourseLandingSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseLanding() {
  const courseLandingInitialFormData = useSelector(
    (state) => state.CourseLanding
  );

  console.log("courseLandingInitialFormData", courseLandingInitialFormData);
  const dispatch = useDispatch();

  const [LandingFormData, setLandingFormData] = useState(
    courseLandingInitialFormData
  );
  console.log("LandingFormData", LandingFormData);
  //...........................................................................
  const changeCourseLandingData = (e, field) => {
    setLandingFormData((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
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
    setLandingFormData((prev) => {
      return {
        ...prev,
        [field]: e,
      };
    });
    dispatch(
      ChangeReduxLandingData({ fieldChange: `${field}`, ValueChange: e })
    );
  };

  //..............................................
  useEffect(() => {
    setLandingFormData(courseLandingInitialFormData);
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <FormControls
            formControls={courseLandingPageFormControls}
            formData={LandingFormData}
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
