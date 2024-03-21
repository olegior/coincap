import { Suspense } from "react";
import { Flex } from "antd";
import { getCoinsAssets } from '@/lib/helpers/api'
import { priceToFixed } from "@/lib/helpers/priceToFixed";
import { CoinAssetType } from '@/types'
import Spinner from "@/components/Spinner";
import CoinSearch from "@/components/Main/CoinSearch";
import CoinsTable from "@/components/Main/CoinsTable";

const getAllCoins = async () => {
  const coins = await getCoinsAssets(1000);

  const dataSource = coins
    .map((coin: CoinAssetType) => {
      const {
        name,
        symbol,
        supply,
        volumeUsd24Hr: volume,
        changePercent24Hr: change,
        priceUsd: price,
        id: key,
        marketCapUsd: capitalization,
      } = coin

      return {
        key, name, symbol,
        title: `${name} ${symbol}`,
        price: priceToFixed(price),
        supply: priceToFixed(supply),
        capitalization: priceToFixed(capitalization),
        volume: priceToFixed(volume),
        change: priceToFixed(change),
      }
    })

  return dataSource
}

export default async function HomePage() {
  const dataSource = await getAllCoins();

  return (
    <Suspense fallback={<Spinner />}>
      <Flex vertical gap={20} align="center">
        <CoinSearch />
        <CoinsTable dataSource={dataSource} />
      </Flex>
    </Suspense>
  );
}
