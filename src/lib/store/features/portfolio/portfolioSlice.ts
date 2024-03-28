import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { sumCoins } from "./sumCoins";
import { getLocalData, setLocalData } from "@/lib/helpers/storage";
import { CoinsSliceType } from "@/lib/types";
import { getCoinsAssets } from "@/lib/helpers/api";
import { AppDispatch, RootState } from "../..";
import { getLength } from "@/lib/helpers/priceToFixed";


type SliceType = {
    coins: CoinsSliceType,
    total: number,
    change: string
}

const initialState: SliceType = {
    coins: {},
    total: 0,
    change: ''
}

const updatePortfolio = createAsyncThunk('updatePortfolio',
    async (
        { prevCoins, coins }:
            { prevCoins: CoinsSliceType, coins: CoinsSliceType },
        thunkApi) => {
        const dispatch = thunkApi.dispatch as AppDispatch

        const previousSum = sumCoins(prevCoins)
        const currentSum = sumCoins(coins)

        const sum = (currentSum - previousSum).toFixed(2);
        const percent = +sum ? ((100 / (previousSum / currentSum)) - 100).toFixed(2) : 0

        const change = `$${sum} 
        ${percent}%`
        dispatch(setCoins(coins));
        dispatch(setTotal(currentSum))
        dispatch(setChange(change))
    }
)


export const setPrevious = createAsyncThunk('setPrevious',
    async (_, thunkApi) => {
        const dispatch = thunkApi.dispatch as AppDispatch
        const prevCoins = getLocalData();
        const keys = Object.keys(prevCoins)

        const coins = (await getCoinsAssets(1000))
            .map(coin => ({ name: coin.name, price: coin.priceUsd }))
            .filter(coin => keys.includes(coin.name))
            .reduce((
                acc: CoinsSliceType,
                coin: { [key: string]: string }
            ) => {
                const name = coin.name;
                const price = +(+coin.price).toFixed(2);
                const quantity = prevCoins[name].quantity;
                const sum = +(price * quantity).toFixed(2);
                if (acc[name])
                    return acc
                acc[name] = { quantity, sum, price }
                return acc
            }, {})

        dispatch(updatePortfolio({ prevCoins, coins }))
    }
)

export const sellCoin = createAsyncThunk('sellCoin',
    async (coin: CoinsSliceType, thunkApi) => {
        const key = Object.keys(coin)[0];
        const state = thunkApi.getState() as RootState
        const dispatch = thunkApi.dispatch as AppDispatch

        const prevCoins = state.portfolio.coins;
        const prevQuantity = state.portfolio.coins[key].quantity;
        const price = state.portfolio.coins[key].price;

        if (prevQuantity === coin[key].quantity) {
            const coins = structuredClone(prevCoins);
            delete coins[key];
            dispatch(updatePortfolio({ prevCoins, coins }))
        }
        else {
            const length = getLength(price);
            const quantity = +(prevQuantity - coin[key].quantity).toFixed(length);
            const sum = +(price * quantity).toFixed(2);
            const coins = { ...prevCoins, [key]: { quantity, sum, price } }
            dispatch(updatePortfolio({ prevCoins, coins }))
        }
    }
)

export const buyCoin = createAsyncThunk('buyCoin',
    async (coin: CoinsSliceType, thunkApi) => {
        const key = Object.keys(coin)[0];
        const state = thunkApi.getState() as RootState
        const dispatch = thunkApi.dispatch as AppDispatch

        const { quantity, price, sum } = coin[key];
        const prevCoins = state.portfolio.coins

        if (prevCoins[key]) {
            const length = getLength(price);
            const newQuantity = +(quantity + prevCoins[key].quantity).toFixed(length);
            const newSum = +(price * newQuantity).toFixed(2)
            const coins = { ...prevCoins, [key]: { quantity: newQuantity, sum: newSum, price } }
            dispatch(updatePortfolio({ prevCoins, coins }))
        }
        else {
            const coins = { ...prevCoins, [key]: { quantity, sum, price } }
            dispatch(updatePortfolio({ prevCoins, coins }))
        }
    }
)

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setCoins: (state, action: PayloadAction<CoinsSliceType>) => {
            state.coins = action.payload
            setLocalData(state.coins)
        },
        setChange: (state, action: PayloadAction<string>) => {
            state.change = action.payload
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload
        },
    },
})

export const { setCoins, setChange, setTotal } = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;