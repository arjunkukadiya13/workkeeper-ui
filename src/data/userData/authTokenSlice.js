import { createSlice } from "@reduxjs/toolkit";

export const authTokenSlice = createSlice({
  name: "authToken",
  initialState: "",
  reducers: {
    setAuthToken: (state, action) => {
      return action.payload; 
    },
    clearAuthToken: () => {
      return ""; 
    },
  },
});

export const { setAuthToken, clearAuthToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;
