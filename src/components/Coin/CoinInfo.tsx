import { CoinAssetType } from "@/types";
import { Descriptions, Table } from "antd";

type PropsType = {
    data: CoinAssetType
}

export default function CoinInfo({ data }: PropsType) {

    const {
        name,
        symbol,
        supply,
        volumeUsd24Hr: volume,
        changePercent24Hr: change,
        priceUsd: price,
        id: key,
        marketCapUsd: capitalization,
        maxSupply,
        explorer,
        rank,
        vwap24Hr
    } = data

    const items = [
        { key: rank, label: 'Рейтинг', children: rank },
        { key: name, label: 'Валюта', children: name },
        { key: symbol, label: 'Обозначение', children: symbol },
        { key: supply, label: 'Доступно', children: supply },
        { key: maxSupply, label: 'Максимум доступно', children: maxSupply },
        { key: capitalization, label: 'Капитализация, $', children: capitalization },
        { key: price, label: 'Цена, $', children: price },
        { key: change, label: 'Изменение, %', children: change },
        { key: volume, label: 'Объем, $ за 24 часа', children: volume },
        { key: vwap24Hr, label: 'VWAP, $ за 24 часа', children: vwap24Hr },
        { key: explorer, label: 'Сайт', children: <a target="_blank" href={explorer} >{explorer}</a> },
    ]

    return (
        <Descriptions items={items} bordered size="small" />
    )
}
