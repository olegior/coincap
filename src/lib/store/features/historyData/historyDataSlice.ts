import { getCoinHistory } from "@/lib/helpers/api";
import { CoinHistoryType, HistoryIntervalType } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHistoryData = createAsyncThunk('historyData/get',
    async ({ id, interval }: { id: string, interval: HistoryIntervalType }) => {
        return await getCoinHistory(id, interval)
    }
)

type SliceType = {
    data: CoinHistoryType[],
    isLoading: boolean,
    error: string | undefined
}

const initialState: SliceType = {
    data: [],
    isLoading: false,
    error: ''
}

const historyDataSlice = createSlice({
    name: 'historyData',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getHistoryData.pending, (state) => {
            state.isLoading = true;
            state.error = ''
        })
        .addCase(getHistoryData.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.error = ''
        })
        .addCase(getHistoryData.rejected, (state, action) => {
            state.isLoading = false,
                state.data = [],
                state.error = action.error.message
        })
})

export const historyDataReducer = historyDataSlice.reducer