import { Button } from "@/components/ui/button";
import { LogOutUser } from "@/redux/authSlice";
import { GraduationCap, TvMinimalPlay } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function StudentView() {
 
 const dispatch=useDispatch()
 const navigate=useNavigate()

  //............................................
function handleLogOut(){
  console.log('clicked')
  dispatch(LogOutUser())
  Cookies.remove('portalToken')
  navigate('/login')
}

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 hover:text-black" />
          <span className="font-extrabold md:text-xl  text-[14px]">
            LMS LEARN
          </span>
        </Link>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogOut}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentView;
