const Progress = require("../../../models/CourseProgressModel").module;
const StudentCourses =
  require("../../../models/studentPayedCoursesModel").module;
const Course = require("../../../models/courseModel").module;

//mark currentLecture as viewed
const markCurrentLectureAsViewed = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;
    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        lecturesProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });
      await progress.save();
    } else {
      //i am checking here beacuse if i clicked on lecture again it should not push it should check first
      //if not there then push
      const lectureProgress = progress.lecturesProgress.find(
        (item) => item.lectureId === lectureId
      );
      if (lectureProgress) {
        (lectureProgress.viewed = true),
          (lectureProgress.dateViewed = new Date());
      } else {
        progress.lecturesProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
          
        });
      }
      await progress.save();
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.json({
        success: false,
        message: "course not found",
      });
    }
    //check all lectures are viewed or not

    //   if(course?.curriculum.length===progress.lecturesProgress.length){
    //     progress.completed=true,
    //     progress.completionDate=new Date()
    //   }

    const allLecturesViewed =
      progress?.lecturesProgress?.length === course.curriculum.length &&
      progress.lecturesProgress.every((item) => item.viewed);
    if (allLecturesViewed) {
      (progress.completed = true), (progress.completionDate = new Date());
      await progress.save();
    }

    res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.json({
      message: error.message || message,
      success: false,
      error: true,
    });
  }
};

//get currentProgress Id

const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const studentPurchasedCourses = await StudentCourses.findOne({
      userId: userId,
    });
    const isCurrentCoursePurchasedByUserOrNot =
      studentPurchasedCourses?.Courses?.findIndex(
        (item) => item.courseId === courseId
      ) > -1;
    if (!isCurrentCoursePurchasedByUserOrNot) {
      return res.json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "You need to purchase this course to access it",
      });
    }
    const currentUserCourseProgress = await Progress.findOne({
      userId,
      courseId,
    });
    console.log("currentUserProgress", currentUserCourseProgress);
    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress?.lecturesProgress.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.json({
          success: false,
          message: "course not found",
        });
      }
      return res.json({
        success: true,
        message: "No progress found,start watching the course",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    //if user already watched 1 0r 2 letures then currentUserCourseProgress length >0
    const courseDetails = await Course.findById(courseId);
    res.json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserCourseProgress?.lecturesProgress,
        completed: currentUserCourseProgress?.completed,
        completionDate: currentUserCourseProgress?.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    res.json({
      message: error.message || message,
      success: false,
      error: true,
    });
  }
};

//reset courseProgress

const ResetCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.json({
        success: false,
        message: "course not found",
      });
    }
    progress.lecturesProgress = [];
    progress.completed = false;
    progress.completionDate = null;

    await progress.save();
    res.json({
      success: true,
      message: "course progress has been reset",
      data: progress,
    });
  } catch (error) {
    res.json({
      message: error.message || message,
      success: false,
      error: true,
    });
  }
};

exports.module = {
  ResetCourseProgress,
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
};
