import { HistoryIntervalType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HistoryIntervalType = 'd1'

const historIntervalSlice = createSlice({
    name: 'historyInterval',
    initialState,
    reducers: {
        setHistoryInterval: (state,action)=>{
            return action.payload
        }
    }
})

export const {setHistoryInterval} = historIntervalSlice.actions;
export const historIntervalReducer = historIntervalSlice.reducer;