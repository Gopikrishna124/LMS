import { createSlice } from "@reduxjs/toolkit";
import { refresh } from "./CourseCurriculumSlice";

const initialState={
    allCourses:[],
    singleCourse:''
}

const CourseDetailsSlice=createSlice({
    name:'courseDetails',
    initialState,
    reducers:{
        SetALLCourses:(state,action)=>{
            state.allCourses=action.payload
        },
        SetSingleCourse:(state,action)=>{
            state.singleCourse=action.payload
        },
        refreshSingleCourse:(state,action)=>{
            state.singleCourse=''
        },
        default:()=>{
            return state
        }
    }
})

export const {SetALLCourses,SetSingleCourse,refreshSingleCourse}=CourseDetailsSlice.actions
export default CourseDetailsSlice.reducer