import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  category: "",
  level:"",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing:"",
  images:"",
  welcomeMessage:"",
  objectives:"",
};

const CourseLandingSliceData = createSlice({
  name: "courseLanding",
  initialState,
  reducers: {
    ChangeReduxLandingData: (state, action) => {
      state[action.payload.fieldChange] = action.payload.ValueChange;
    },
    refreshLand: (state, action) => {
      for (let key in state) {
        state[key] = "";
      }
    },
  },
});

export const { ChangeReduxLandingData, refreshLand } =
  CourseLandingSliceData.actions;
export default CourseLandingSliceData.reducer;
