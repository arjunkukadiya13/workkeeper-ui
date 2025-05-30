import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./userData/loginSlice";
import  userReducer  from "./userData/userSlice";
import  todaysLeaveResucer  from "./leaveData/leaveSlice";

export const store = configureStore({
  reducer: {
    isLogin: loginReducer,
    userData:userReducer,
    todayLeaveData:todaysLeaveResucer
  },
});
