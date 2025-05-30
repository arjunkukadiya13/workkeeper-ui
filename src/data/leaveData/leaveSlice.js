import { createSlice } from "@reduxjs/toolkit";

export const todayLeaveSlice = createSlice({
    name: "todayLeaveData",
    initialState: [],
    reducers: {
        setTodayLeaveData: (state, action) => {
            return action.payload;
        },
        removeTodayLeaveData: () => {
            return [];
        },
    },
});

export const { setTodayLeaveData, removeTodayLeaveData } = todayLeaveSlice.actions;

export default todayLeaveSlice.reducer;
