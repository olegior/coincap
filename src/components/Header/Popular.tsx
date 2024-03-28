import { getCoinsAssets } from "@/lib/helpers/api";
import { CoinAssetType } from "@/lib/types";
import { Descriptions } from "antd";
import { priceToFixed } from "@/lib/helpers/priceToFixed";
import Link from "next/link";

type DescriptionItemType = {
  key: string,
  label: React.ReactElement,
  children: string,
}

const setDescriptionItem = (element: CoinAssetType): DescriptionItemType => {

  const { rank, name, priceUsd, id } = element
  const price = priceToFixed(priceUsd)

  return {
    key: rank,
    label: <Link href={id}>{name}</Link>,
    children: `${price} $`,
  }
}

export default async function Popular() {

  const data = (await getCoinsAssets(3, 0)).map(el => setDescriptionItem(el))

  return (
    <Descriptions className="header__popular"
      items={data}
      size="small"
      column={{ xs: 1, md: 3 }}
      labelStyle={{ backgroundColor: 'transparent' }}
      contentStyle={{ wordBreak: 'keep-all' }}
    />
  )
}
