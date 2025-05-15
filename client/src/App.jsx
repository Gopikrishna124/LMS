import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/Home";
import ProtectedRoute from "./ProtectedRoute/index";
import NotFound from "./pages/NotFound";
import AddNewCourse from "./pages/instructor/add-new-course";
import StudentViewExploreCoursesPage from "./pages/student/course/index.jsx";
import CourseDetails from "./pages/student/course-details.jsx";
import PaymentReturn from "./pages/student/payment-return/index";
import StudentPayedCourses from "./pages/student/Student-payed-courses/index.jsx";
import StudentCourseProgress from "./pages/student/Course-Progress";

function App() {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element:<ProtectedRoute><StudentHomePage/></ProtectedRoute> 
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:'/instructor',
      element:<ProtectedRoute><InstructorDashboardPage/></ProtectedRoute>
    },
    {
      path:"/instructor/create-new-course",
      element:<AddNewCourse/>
    },
    { 
      path:'/instructor/edit-course/:id',
      element:<AddNewCourse/>
    },
    {
     path:'/student/exploreCourses',
     element:<StudentViewExploreCoursesPage/>
    },
    {
      path:'/student/course-details/:id',
      element:<CourseDetails/>
    },
     {
      path:'/payment-return', //this path('payment-return') is visible in params url when we click                          //  on review payment so we are loading payment return component                   
      element:<PaymentReturn/>
     },
     { 
      path:'/studentPayed-courses',  //we gave this path after getting resposne //from captureApi and redirect to this path //see in payment-return component
      element:<StudentPayedCourses/> 
     },
     {
      path:'/course-progress/:id',
      element:<StudentCourseProgress/>
     },
    {
      path:"*",
      element:<NotFound/>
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
