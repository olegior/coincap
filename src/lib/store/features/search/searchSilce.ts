import { createSlice } from "@reduxjs/toolkit";

const initialState: string = '';

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchCoin: (_, action) => {
            return action.payload
        }
    }
})

export const { searchCoin } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
