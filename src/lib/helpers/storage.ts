"use client"

import { CoinsSliceType } from "../types"

export const getLocalData = (): CoinsSliceType => {
        return JSON.parse(localStorage.getItem('coins') || "{}")
}

export const setLocalData = (coins: CoinsSliceType): void => {
    localStorage.setItem('coins', JSON.stringify(coins))
}