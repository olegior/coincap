import { CoinAssetType, CoinHistoryType, HistoryIntervalType } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { notFound } from "next/navigation";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})

api.interceptors.response.use((response) => {
    return response.data.data
}, (err: AxiosError) => {
    if (err.response?.status === 404)
        notFound()
}
)

export const getCoinsAssets = (limit?: number): Promise<CoinAssetType[]> => {
    if (limit) {
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