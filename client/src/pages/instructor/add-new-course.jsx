import CourseLanding from "@/componentpages/InstructorComponents/Courses/add-new-course/course-landing";
import Coursesettings from "@/componentpages/InstructorComponents/Courses/add-new-course/course-settings";
import Curriculum from "@/componentpages/InstructorComponents/Courses/add-new-course/curriculum";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  changeCurriculumReduxData,
  refresh,
} from "@/redux/Instructor/CourseCurriculumSlice";
import { useEffect } from "react";
import {
  ChangeReduxLandingData,
  refreshLand,
} from "@/redux/Instructor/CourseLandingSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewInstructorCourse,
  fetchSingleCourseDetails,
  updateCourseDetails,
} from "@/Api/instructorCourses";
import { useNavigate, useParams } from "react-router-dom";
import { SetSingleCourse } from "@/redux/Instructor/CourseDetails";

function AddNewCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const instructorDetails = useSelector((state) => state.user?.userDetails);

  const courseLandingInitialFormData = useSelector(
    (state) => state.CourseLanding
  );

  const CurriculumInitialFormData = useSelector(
    (state) => state.CurriculumReduxFormData.data
  );

  //...............................................
  useEffect(() => {
    const refreshing = () => {
      dispatch(refresh());
      dispatch(refreshLand());
    };
    refreshing();
  }, []);

  //..............................................................
  // const changeFormData=(e,keyValue)=>{
  //   setCourseLandingInitialformData((prev)=>{
  //     return {
  //       ...prev,
  //       [keyValue]:e.target.value
  //     }
  //   })
  // }

  // /.....................................

  // const changeSelected=(selected,e)=>{
  //   console.log('select E',e)
  //    setCourseLandingInitialformData((prev)=>{
  //       return {
  //         ...prev,
  //         [selected]:e
  //       }
  //    })
  // }
  // ...................................................

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }
  //....................................................
  function handleValidationForSavingCourse() {
    for (let key in courseLandingInitialFormData) {
      if (isEmpty(courseLandingInitialFormData[key])) {
        return false;
      }
    }

    let hasfreePreview = false;

    for (let item of CurriculumInitialFormData) {
      if (
        isEmpty(item?.title) ||
        isEmpty(item?.videoUrl) ||
        isEmpty(item?.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasfreePreview = true; //found atleast one free preview which is true
      }
    }

    return hasfreePreview;
  }

  //..........................
  async function handleCreateCourse() {
    const finalFormData = {
      instructorId: instructorDetails?.id,
      instructorName: instructorDetails?.username,
      date: new Date(),
      ...courseLandingInitialFormData,
      students: [],
      curriculum: CurriculumInitialFormData,
      isPublished: true,
    };
    console.log("finalFormData", finalFormData);
    const response = await addNewInstructorCourse(finalFormData);
    console.log("finalRespone", response);
    if (response?.data?.success) {
      dispatch(refresh());
      dispatch(refreshLand());
      navigate(-1);
    }
  }

  // ...........................................................

  const params = useParams();
  const paramsId = params.id;

  useEffect(() => {
    if (paramsId) {
      const fetchSingleCourse = async () => {
        const response = await fetchSingleCourseDetails(paramsId);
        console.log("singleCourse", response);
        if (response?.data?.success) {
          dispatch(changeCurriculumReduxData(response.data.data.curriculum));
          for (let key in courseLandingInitialFormData) {
            dispatch(
              ChangeReduxLandingData({
                fieldChange: `${key}`,
                ValueChange: response.data.data[key],
              })
            );
          }
        }
      };
      fetchSingleCourse();
    }
  }, [dispatch, paramsId]);

  //..................................................
  const handleEditCourse = async () => {
    const finalFormData = {
      instructorId: instructorDetails?.id,
      instructorName: instructorDetails?.username,
      date: new Date(),
      ...courseLandingInitialFormData,
      students: [],
      curriculum: CurriculumInitialFormData,
      isPublished: true,
    };
    const response = await updateCourseDetails(paramsId, finalFormData);
    console.log("updatedResponse", response);
    dispatch(refresh());
    dispatch(refreshLand());
    navigate(-1);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
        {paramsId ? (
          <Button
            disabled={!handleValidationForSavingCourse()}
            onClick={handleEditCourse}
            className="text-sm tracking-wider font-bold px-8"
          >
            Update
          </Button>
        ) : (
          <Button
            disabled={!handleValidationForSavingCourse()}
            onClick={handleCreateCourse}
            className="text-sm tracking-wider font-bold px-8"
          >
            SUBMIT
          </Button>
        )}
      </div>

      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Curriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <Coursesettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCourse;
