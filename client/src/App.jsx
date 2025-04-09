import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { RouterProvider } from "react-router";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/Home";
import ProtectedRoute from "./ProtectedRoute/index";
import NotFound from "./pages/NotFound";
import AddNewCourse from "./pages/instructor/add-new-course";


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
      path:"*",
      element:<NotFound/>
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
