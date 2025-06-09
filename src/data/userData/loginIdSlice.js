import { createSlice } from "@reduxjs/toolkit";

export const loginIdSlice = createSlice({
  name: "loginId",
  initialState: null,
  reducers: {
    setLoginId: (state, action) => action.payload,
    clearLoginId: () => null, 
  },
});

export const { setLoginId, clearLoginId } = loginIdSlice.actions;

export default loginIdSlice.reducer;
