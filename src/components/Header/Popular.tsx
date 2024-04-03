"use client"
import { webSocket } from "@/lib/helpers/api";
import { CoinAssetType } from "@/lib/types";
import { Descriptions } from "antd";
import { priceToFixed } from "@/lib/helpers/priceToFixed";
import Link from "next/link";
import { useState, useEffect } from 'react'

type PropsType = {
  data: CoinAssetType[]
}

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
    children: `${price}$`,
  }
}

export default function Popular({ data }: PropsType) {

  const [state, setState] = useState<DescriptionItemType[]>([])
  const coins = data.map(el => el.id).join(',');

  useEffect(() => {
    const ws = webSocket(coins);
    ws.onmessage = (message) => {
      const messageData = JSON.parse(message.data)
      const keys = Object.keys(messageData);
      const updatedPrices = data.map(coin => {
        return {
          ...coin,
          priceUsd: keys.includes(coin.id)
            ? messageData[coin.id]
            : coin.priceUsd
        }
      })
      setState(updatedPrices.map(setDescriptionItem))
    }
    return () => ws.close()
  })

  return (
    <Descriptions className="header__popular"
      items={state}
      size="small"
      column={{ xs: 1, md: 3 }}
      labelStyle={{ backgroundColor: 'transparent' }}
      contentStyle={{ wordBreak: 'keep-all' }}
    />
  )
}
