export type CoinAssetType = {
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string,
    explorer: string,
}

export type TableCoinAssetType = {
    key: string,
    name: string,
    symbol: string,
    title: string,
    price: string,
    supply: string,
    capitalization: string,
    volume: string,
    change: string,
}

type ResponseType<T> = {
    data: T,
    timestamp: number
}

export type HistoryIntervalType = 'd1' | 'h12' | 'h6' | 'h2' | 'h1' | 'm30' | 'm15' | 'm5' | 'm1'

export type CoinHistoryType = {
    priceUsd: 'string',
    time: number
}

export type ResponseCoinHistoryType = ResponseType<CoinHistoryType[]>

type CoinSliceType = {
    quantity: number,
    sum: number,
    price: number
}

export type CoinsSliceType = {
    [key: string]: CoinSliceType
}
