"use client"
import InputForm from '@/components/Coin/Form/InputForm'
import { buyCoin } from '@/lib/store/features/portfolio/portfolioSlice';
import { Button, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import CoinsInStock from './Form/CoinsInStock';
import { useAppDispatch } from '@/lib/store/hooks';

type PropsType = {
    data: {
        [key: string]: string
    }
}
export default function PageBuyForm({ data }: PropsType) {

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const handleBuyClick = () => {
        const { sum, quantity } = form.getFieldsValue()
        if (sum && quantity) {
            const payload = {
                [data.name]: {
                    sum, quantity,
                    price: +(+data.priceUsd).toFixed(2)
                }
            };
            dispatch(buyCoin(payload));
            form.resetFields();
        }
    }

    return (
        <Flex align='center' style={{ padding: 20 }} className='page-buy'>
            <Flex justify='center' align='flex-start' className='page-buy__form'>
                <InputForm data={data} form={form} />
                <Button onClick={handleBuyClick} size='large'>Купить</Button>
            </Flex>
            <CoinsInStock name={data.name} symbol={data.symbol} fontSize={16} />
        </Flex>
    )
}
