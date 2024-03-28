"use client"
import BuyForm from '@/components/Coin/Form/BuyForm'
import { buyCoin } from '@/lib/store/features/portfolio/portfolioSlice';
import { Button, Flex, Space } from 'antd';
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import CoinsInStock from './Form/CoinsInStock';
import { useAppDispatch } from '@/lib/store/hooks';

type PropsType = {
    data: {
        [key: string]: string
    }
}
export default function PageBuy({ data }: PropsType) {

    const [form] = useForm();
    const dispatch = useAppDispatch();

    const handleBuyClick = () => {
        const payload = { [data.name]: form.getFieldsValue() };
        // dispatch(setPortfolio(payload));
        dispatch(buyCoin(payload));
        form.resetFields();
    }

    return (
        <Flex vertical align='center'>
            <Flex justify='center' align='center'>
                <BuyForm data={data} form={form} />
                <Button onClick={handleBuyClick} size='large'>Купить</Button>
            </Flex>
            <CoinsInStock name={data.name} symbol={data.symbol} fontSize={16} />
        </Flex>
    )
}
