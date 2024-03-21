"use client"
import BuyForm from '@/components/Coin/Modal/BuyForm'
import { Button, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React from 'react'

type PropsType = {
    data: {
        [key: string]: string
    }
}
export default function BuyCoin({ data }: PropsType) {

    const [form] = useForm();

    return (
        <Flex justify='center' align='center'>
            <BuyForm data={data} form={form} />
            <Button>Купить</Button>
        </Flex>
    )
}
