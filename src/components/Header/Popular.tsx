import { getCoinsAssets } from "@/lib/helpers/api";
import { CoinAssetType } from "@/types";
import { Descriptions } from "antd";
import { priceToFixed } from "@/lib/helpers/priceToFixed";

type DescriptionItemType = {
  key: string,
  label: string,
  children: string,
  response?: string[]
}

const setDescriptionItem = (element: CoinAssetType): DescriptionItemType => {

  const { rank, name, priceUsd } = element
  const price = priceToFixed(priceUsd)

  return {
    key: rank,
    label: name,
    children: `${price} $`,
  }
}

const getPopular = async () => {
  return await getCoinsAssets(3, 0)
}

export default async function Popular() {

  const data = (await getPopular()).map(el => setDescriptionItem(el))

  return (
    <Descriptions className="header__popular"
      items={data} size="small"
      contentStyle={{ wordBreak: 'keep-all', width:'fit-content'}} />
  )
}
