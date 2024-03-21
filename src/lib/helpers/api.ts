import { CoinAssetType, CoinHistoryType, CoinMarketType, CoinRateType, HistoryIntervalType } from "@/types";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.ENDPOINT,
    headers: {
        'Accept-Encoding': 'gzip',
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})

api.interceptors.response.use((response) => {
    if (!(response.statusText === 'OK'))
        return [];
    return response.data.data
})

export const getCoinsAssets = (limit?: number, offset?: number): Promise<CoinAssetType[]> => {
    if (limit || offset) {
        // return api.get(`assets?limit=${limit}&offset=${offset}`)
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

export const getCoinMarkets = (id: string): Promise<CoinMarketType[]> => {
    return api.get(`assets/${id}/markets`)
}

export const getCoinRates = (id: string): Promise<CoinRateType[]> => {
    return api.get(`rates/${id}`)
}