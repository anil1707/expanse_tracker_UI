// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    addProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    getProfile: (state) => {
      return state; 
    },
  },
});

export const { addProfile, getProfile } = getProfileSlice.actions;
export default getProfileSlice.reducer;
