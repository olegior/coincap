import { getCoinAssets, getCoinRates } from '@/lib/helpers/api'
import { Flex, } from 'antd'
import { Metadata } from 'next'
import { CoinType, } from '@/types'
import CoinChart from '@/components/Coin/CoinChart';
import CoinInfo from '@/components/Coin/CoinInfo';
import Title from 'antd/es/typography/Title'
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import BuyForm from '@/components/Coin/Modal/BuyForm';
import BuyCoin from './BuyCoin';


type PropsType = {
    params: {
        coin: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const coin = params.coin[0].toUpperCase() + params.coin.slice(1);
    return {
        title: `${coin} | Coincap`,
        description: `Information about ${coin}`
    }
}

async function getCoinData(id: string): Promise<CoinType> {
    const coin = await getCoinAssets(id)
    // const markets = await getCoinMarkets(id)
    const rates = await getCoinRates(id)
    // const exchanges = (await api.get(`exchanges/${id}`)).data;

    return {
        coin,
        // history, 
        // markets, 
        rates,
        // exchanges
    }
}

export default async function CoinPage({ params }: PropsType) {

    const { coin, } = await getCoinData(params.coin)

    return (
        <Flex vertical style={{ width: '100%', padding: 20 }} gap={20} >
            <Suspense fallback={<Spinner />}>
                <Title level={3}>{coin.name}</Title>
                {/* <BuyCoin data={coin} /> */}
                <CoinInfo data={coin} />
                <CoinChart coin={params.coin} />
            </Suspense>
        </Flex>
    )
}
