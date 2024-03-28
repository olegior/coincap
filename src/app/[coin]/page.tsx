import { getCoinAssets } from '@/lib/helpers/api'
import { Flex, } from 'antd'
import { Metadata } from 'next'
import CoinChart from '@/components/Coin/CoinChart';
import CoinInfo from '@/components/Coin/CoinInfo';
import Title from 'antd/es/typography/Title'
import { Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import PageBuy from '@/components/Coin/PageBuy';

type PropsType = {
    params: {
        coin: string
    }
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    const coin = (await getCoinAssets(params.coin)).name
    return {
        title: `${coin} | Coincap`,
        description: `Information about ${coin}`
    }
}

export default async function CoinPage({ params }: PropsType) {

    const coin = await getCoinAssets(params.coin)

    return (
        <Flex vertical style={{ width: '100%', padding: 20 }} gap={20} >
            <Suspense fallback={<Spinner />}>
                <Title level={3}>{coin.name}</Title>
                <PageBuy data={{ ...coin, price: coin.priceUsd }} />
                <CoinInfo data={coin} />
                <CoinChart coin={params.coin} />
            </Suspense>
        </Flex>
    )
}
