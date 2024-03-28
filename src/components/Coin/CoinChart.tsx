"use client"
import { getHistoryData } from '@/lib/store/features/historyData/historyDataSlice';
import { setHistoryInterval } from '@/lib/store/features/historyInterval/historyIntervalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { HistoryIntervalType } from '@/lib/types';
import { Line } from "@ant-design/plots";
import { Flex, Select, Spin } from 'antd';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

type PropsType = {
    coin: string
}

type HistorySelectType = {
    label: string,
    value: HistoryIntervalType
}

const selectOptions: HistorySelectType[] = [
    { label: '1 день', value: 'd1' },
    { label: '12 часов', value: 'h12' },
    { label: '6 часов', value: 'h6' },
    { label: '2 часа', value: 'h2' },
    { label: '1 час', value: 'h1' },
    { label: '30 мин.', value: 'm30' },
    { label: '15 мин.', value: 'm15' },
    { label: '5 мин.', value: 'm5' },
    { label: '1 мин.', value: 'm1' },
]


export default function CoinChart({ coin }: PropsType) {

    const interval = useAppSelector(store => store.historInterval)
    const { data, isLoading } = useAppSelector(store => store.historyData)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getHistoryData({ id: coin, interval }))
    }, [])

    const handleChangeInterval = (interval: HistoryIntervalType) => {
        dispatch(setHistoryInterval(interval))
        dispatch(getHistoryData({ id: coin, interval }))
    }

    const config = {
        xField: 'date',
        yField: '$, USD',
        data: data.map(val => ({ ...val, '$, USD': +val.priceUsd, date: new Date(val.time) })),
        slider: {
            x: {}
        },
    };

    return (
        <Spin spinning={isLoading} size='large'
            indicator={<LoadingOutlined style={{ fontSize: 24 }} />}        >
            <Flex vertical gap={30} >
                <Flex justify='flex-end'>
                    <Select options={selectOptions}
                        defaultValue={interval}
                        size='large'
                        onChange={handleChangeInterval} />
                </Flex>
                {!!data.length
                    ? <Line {...config} />
                    : <Flex justify='center' align='center'>
                        <Title type='secondary' level={3}>Нет данных для построения графика</Title>
                    </ Flex>}
            </Flex>
        </Spin>
    );
}
