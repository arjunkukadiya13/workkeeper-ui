import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./userData/loginSlice";
import  userReducer  from "./userData/userSlice";
import  todaysLeaveResucer  from "./leaveData/leaveSlice";
import  authToken  from "./userData/authTokenSlice";
import  loginId  from "./userData/loginIdSlice";

export const store = configureStore({
  reducer: {
    isLogin: loginReducer,
    userData:userReducer,
    todayLeaveData:todaysLeaveResucer,
    authToken:authToken,
    loginId:loginId
  },
});
