"use client"
import Text from 'antd/es/typography/Text'
import { useAppSelector } from '@/lib/store/hooks'

type PropsType = {
    name: string,
    symbol: string,
    fontSize?: number
}

export default function CoinsInStock({ name, symbol, fontSize }: PropsType) {
    const coin = useAppSelector(state => state.portfolio.coins[name])
    if (!coin?.quantity) {
        return null
    }
    return (
        <Text style={{ paddingInline: 10, fontSize }}>
            {`У вас ${coin?.quantity} ${symbol}`}
        </Text>
    )
}
