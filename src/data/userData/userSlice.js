import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"userData",
    initialState:[],
    reducers:{
        setUserData:(data)=>data,
        removeUserData:(data)=>[]

    }
});
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
