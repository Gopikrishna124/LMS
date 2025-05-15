const Course = require("../../../models/courseModel").module;
const StudentCourses =
  require("../../../models/studentPayedCoursesModel").module;

const getSingleStudentViewCourse = async (req, res) => {
  const { id, studentId } = req.params;
  //    console.log('paramsId',id)
  //    console.log('studentId',studentId)
  try {
    if (!id) {
      throw new Error("id is required");
    }
    const result = await Course.findById(id);
    if (!result) {
      res.json({
        data: [],
        message: "No course Details Found",
        error: true,
        success: false,
      });
    }

    //    checking if course is bought by user or not

    const AlreadyBoughtCourse = await StudentCourses.findOne({
      userId: studentId,
    });

    const existingCourse =
      AlreadyBoughtCourse?.Courses?.find((item) => item.courseId === id)
    // console.log("exist", existingCourse);

    res.json({
      data: result,
      success: true,
      error: false,
      CoursePurchasedId: existingCourse?.courseId || null,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

exports.module = getSingleStudentViewCourse;
