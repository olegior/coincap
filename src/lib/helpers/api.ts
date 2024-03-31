import { CoinAssetType, CoinHistoryType, HistoryIntervalType } from "@/lib/types";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})

api.interceptors.response.use((response) => {
    return response.data.data
})

export const getCoinsAssets = (limit?: number, offset?: number): Promise<CoinAssetType[]> => {
    if (limit || offset) {
        return api.get(`assets?limit=${limit}`)
    }
    return api.get('assets')
}

export const getCoinAssets = (id: string): Promise<CoinAssetType> => {
    return api.get(`assets/${id}`);
}

export const getCoinHistory = (id: string, interval: HistoryIntervalType): Promise<CoinHistoryType[]> => {
    return api.get(`assets/${id}/history?interval=${interval}`)
}

export const webSocket = (coins: string) => {   
    return new WebSocket(`wss://ws.coincap.io/prices?assets=${coins}`)
}