import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type SliceType = {
    coins: {
        [key: string]: {
            quantity: number,
            sum: number
        }
    },
    total: number
}

const initialState: SliceType = {
    coins: {},
    total: 0
}

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolio: (state, action) => {
            const key = Object.keys(action.payload)[0];
            let quantity = +action.payload[key].quantity;
            let sum = +action.payload[key].sum;

            if (state.coins[key]) {
                quantity += +state.coins[key].quantity;
                sum += +state.coins[key].sum;
            }
            // state.coins = { ...state.coins, [key]: { ...action.payload, quantity } }
            state.coins = { ...state.coins, [key]: { quantity, sum } }
            let total = +Object.values(state.coins).reduce((acc, coin) => acc + coin.sum, 0).toFixed(2)
            state.total = total;

        }
    },
})

export const { setPortfolio } = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;