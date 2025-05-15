import { fetchSingleStudentViewCourseService } from "@/Api/studentCourses";
import StudentHeader from "@/componentpages/StudentComponents/header";
import VideoPlayer from "@/componentpages/videoPlayer/index.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import {
  PaymentCourseService,
  CapturePaymentServcie,
} from "@/Api/studentPayment";

function CourseDetails() {
  const { id } = useParams();

  const [studentViewCourseDetails, SetStudentViewCourseDetails] = useState("");

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);

  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

  const [approvalUrl, setApprovalUrl] = useState("");

  const userDetails = useSelector((state) => state.user.userDetails);
  console.log("userDetails", userDetails);

  const userId = userDetails.id;
  console.log("userId", userId);

  const navigate = useNavigate();

  //.................................................................
  useEffect(() => {
    const getCourseDetailsById = async () => {
      try {
        const respone = await fetchSingleStudentViewCourseService(id, userId);
        console.log("response", respone);
        if (respone.data.success && respone.data.CoursePurchasedId !== null) {
          navigate(`/course-progress/${respone.data.CoursePurchasedId}`);
        } else {
          if (respone.data.success) {
            SetStudentViewCourseDetails(respone.data.data);
          }
        }
      } catch (error) {
        console.log("err", error);
        setCoursePurchasedId(null);
      }
    };
    if (id !== null && userId !== "") {
      getCourseDetailsById();
    }
  }, [id]);

  // .........................................................
  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails && studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  //.............................................................
  const handleFreePreview = (getCurrentVideoInfo, index) => {
    console.log("getCurrrentVideoInfo", getCurrentVideoInfo);
    setShowFreePreviewDialog(true);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  };
  ///..................................................
  const handlePayment = async () => {
    const paymentPayload = {
      userId: userDetails?.id,
      userName: userDetails?.username,
      userEmail: userDetails?.email,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.images,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    const response = await PaymentCourseService(paymentPayload);
    if (response.data.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response.data.data.orderId)
      );
      setApprovalUrl(response?.data.data.approveUrl); //if its ok we will redirect to approval link
      // see down//
    }
  };

  //if payment response is done and we get approval url from backend redirect to that url//
  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }
  return (
    <>
      {studentViewCourseDetails._id && (
        <div>
          <StudentHeader />
          <div className="container mx-auto p-4">
            <div className="bg-gray-900 text-white p-4 rounded-t-lg">
              <h1 className="text-3xl font-bold mb-4 ">
                {studentViewCourseDetails?.title}
              </h1>
              <p className="text-xl mb-4">
                {studentViewCourseDetails?.subtitle}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span>
                  Created By {studentViewCourseDetails?.instructorName}
                </span>
                <span>
                  Created on {studentViewCourseDetails?.date?.split("T")[0]}
                </span>
                <span className="flex items-center">
                  <Globe className="mr-1 h-4 w-4" />
                  {studentViewCourseDetails?.primaryLanguage}
                </span>
                <span className="bg-white text-black p-1 w-20 h-7 rounded-lg ">
                  {studentViewCourseDetails?.students?.length}{" "}
                  {studentViewCourseDetails?.students?.length == 1
                    ? "Student"
                    : "Students"}
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <main className="flex-grow">
                <Card className="mb-8">
                  <CardHeader>What you'll learn</CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {studentViewCourseDetails?.objectives
                      ?.split(",")
                      .map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 w-5 h-5 text-green-500" />
                          <span>{objective}</span>
                        </li>
                      ))}
                  </CardContent>
                </Card>
                <Card className="mb-8">
                  <CardHeader>Course Description</CardHeader>
                  <CardContent>
                    {studentViewCourseDetails?.description}
                  </CardContent>
                </Card>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {studentViewCourseDetails?.curriculum?.map(
                      (curriculumItem, index) => (
                        <li
                          key={index}
                          className={`${
                            curriculumItem.freePreview
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } flex items-center mb-4`}
                          onClick={
                            curriculumItem?.freePreview
                              ? () => handleFreePreview(curriculumItem, index)
                              : null
                          }
                        >
                          {curriculumItem?.freePreview ? (
                            <PlayCircle className="mr-2 h-4 w-4" />
                          ) : (
                            <Lock className="mr-2 h-4 w-4" />
                          )}
                          <span>{curriculumItem?.title}</span>
                        </li>
                      )
                    )}
                  </CardContent>
                </Card>
              </main>
              <aside className="w-full  md:w-[500px]">
                <Card className="sticky top-4">
                  <CardContent>
                    <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                      {studentViewCourseDetails && (
                        <VideoPlayer
                          url={
                            getIndexOfFreePreviewUrl !== -1
                              ? studentViewCourseDetails?.curriculum[
                                  getIndexOfFreePreviewUrl
                                ].videoUrl
                              : ""
                          }
                          width="450px"
                          height="250px"
                        />
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">
                        ${studentViewCourseDetails?.pricing}
                      </span>
                    </div>
                    <Button className="w-full" onClick={handlePayment}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>

            <Dialog
              open={showFreePreviewDialog}
              onOpenChange={() => {
                setShowFreePreviewDialog(false);
                setDisplayCurrentVideoFreePreview(null);
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Course Preview</DialogTitle>
                </DialogHeader>
                <div className="aspect-video mb-3 rounded-lg flex items-center justify-center">
                  {studentViewCourseDetails && (
                    <VideoPlayer url={displayCurrentVideoFreePreview} />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {studentViewCourseDetails &&
                    studentViewCourseDetails?.curriculum
                      .filter((item) => item.freePreview)
                      .map((filteredItem, index) => (
                        <Button
                          key={index}
                          className="cursor-pointer w-auto bg-slate-600"
                          onClick={() => handleFreePreview(filteredItem)}
                        >
                          {filteredItem?.title}
                        </Button>
                      ))}
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseDetails;
