import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { createRoot } from 'react-dom/client'
import storage from 'redux-persist/lib/storage'


import courseDetailsReduce from '../redux/Instructor/CourseDetails'
import CourseCurriculumReducer from '../redux/Instructor/CourseCurriculumSlice'
import CourseLandingReducer from '../redux/Instructor/CourseLandingSlice'
import StudentCourseReducer from '../redux/Student/CourseSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

 const rootReducer=combineReducers({
  user:authReducer,
  // CourseLanding:CourseLandingReducer,
  CourseLanding:CourseLandingReducer,
  CurriculumReduxFormData:CourseCurriculumReducer,
  CourseDetails:courseDetailsReduce,
  StudentCourse:StudentCourseReducer
 })
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;
