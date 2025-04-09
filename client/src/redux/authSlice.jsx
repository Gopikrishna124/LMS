import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userDetails: "",
   authenticated:false
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUserDetails:(state,action)=>{
      state.userDetails=action.payload
      state.authenticated=true
    },
    LogOutUser:(state,action)=>{
      state.userDetails=''
      state.authenticated=false
    }
  },
});

export const {SetUserDetails,LogOutUser} = authSlice.actions;

export default authSlice.reducer;
