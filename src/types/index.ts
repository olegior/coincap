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

type ResponseType<T> = {
    data: T,
    timestamp: number

}

export type ResponseCoinAssetsType = ResponseType<CoinAssetType[]>

export type HistoryIntervalType = 'd1' | 'h12' | 'h6' | 'h2' | 'h1' | 'm30' | 'm15' | 'm5' | 'm1'


export type CoinHistoryType = {
    priceUsd: 'string',
    time: number
}

export type ResponseCoinHistoryType = ResponseType<CoinHistoryType[]>

export type CoinMarketType = {
    exchangeId: string,
    baseId: string,
    quoteId: string,
    baseSymbol: string,
    quoteSymbol: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    volumePercent: string
}

export type ResponseCoinMarketsType = ResponseType<CoinMarketType[]>

export type CoinRateType = {
    id: string,
    symbol: string,
    currencySymbol: string,
    type: string,
    rateUsd: number
}

export type ResponseCoinRatesType = ResponseType<CoinRateType[]>

export type CoinExchangeType = {
    id: string,
    name: string,
    rank: string,
    percentTotalVolume: string,
    volumeUsd: string,
    tradingPairs: string,
    socket: boolean,
    exchangeUrl: string,
    updated: number
}

export type ResponseCoinExchangesType = ResponseType<CoinExchangeType[]>


export type CoinType = {
    coin: CoinAssetType,
    // history: CoinHistoryType[],
    // markets: CoinMarketType[],
    rates?: CoinRateType[],
    // exchanges: CoinExchangeType
}