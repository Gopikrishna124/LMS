import { createSlice } from "@reduxjs/toolkit";

const initialState={
    AllCourses:[],
    SingleCourse:'',
    StudentBoughtCoures:[]
}

const StudentCourseSlice=createSlice({
    name:'studentCourse',
    initialState,
    reducers:{
      keepAllStudentCourses:(state,action)=>{
        state.AllCourses=action.payload
      },
      GetAllStudentBoughtCourses:(state,action)=>{
        state.StudentBoughtCoures=action.payload
      }
    }

})

export const {keepAllStudentCourses,GetAllStudentBoughtCourses}=StudentCourseSlice.actions
export default StudentCourseSlice.reducer