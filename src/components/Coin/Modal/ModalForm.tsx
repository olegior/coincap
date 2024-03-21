"use client"
import { Flex, FormInstance, } from 'antd'
import Title from 'antd/es/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import BuyForm from './BuyForm'
import { useAppSelector } from '@/lib/store/hooks'

type PropsType = {
  data: {
    [key: string]: string
  },
  form: FormInstance
}

export default function ModalForm({ data, form }: PropsType) {
  const { name, symbol } = data;

  const coin = useAppSelector(state => state.portfolio.coins[name])

  return (
    <Flex vertical justify='space-between'>
      <Title level={4}>Купить {data.name}</Title>
      <BuyForm form={form} data={data} />
      {coin?.quantity && <Paragraph style={{ paddingInline: 10 }}>{`У вас ${coin?.quantity} ${symbol}`}</Paragraph>}
    </Flex>
  )
}
