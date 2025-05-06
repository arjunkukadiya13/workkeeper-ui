import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./userData/loginSlice";

export const store = configureStore({
  reducer: {
    isLogin: loginReducer,
  },
});
