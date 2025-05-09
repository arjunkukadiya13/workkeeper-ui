import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"userData",
    initialState:{},
    reducers:{
        setUserData: (state, action) => {
            return action.payload; 
            },
            removeUserData: () => {
            return {};
            }

    }
});
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
