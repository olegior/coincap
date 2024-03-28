"use client"
import { Flex, FormInstance, } from 'antd'
import Title from 'antd/es/typography/Title'
import BuyForm from '../Form/BuyForm'
import CoinsInStock from '../Form/CoinsInStock'
import { CoinAssetType, TableCoinAssetType } from '@/lib/types'

type PropsType = {
  data: TableCoinAssetType | CoinAssetType
  form: FormInstance
}

export default function ModalForm({ data, form }: PropsType) {
  const { name, symbol } = data;

  return (
    <Flex vertical justify='space-between'>
      <Title level={4}>Купить {data.name}</Title>
      <BuyForm form={form} data={data} />
      <CoinsInStock name={name} symbol={symbol} />
    </Flex>
  )
}
