"use client"
import React from 'react'
import { WalletOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Text from 'antd/es/typography/Text';
import { useAppSelector } from '@/lib/store/hooks';

export default function Portfolio() {

  const total = useAppSelector(state => state.portfolio.total)

  return (
    <Flex justify='space-between' align='center' gap={10}>
      <Text>{total} $</Text>
      <Button type='text'>
        <WalletOutlined
          style={{ fontSize: 24 }}
        />
      </Button>
    </Flex>
  )
}
