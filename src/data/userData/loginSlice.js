import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "isLogin",
  initialState: false,
  reducers: {
    userLogin: (state) => true,
    userLogout: (state) => false,
  },
});


export const { userLogin, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
