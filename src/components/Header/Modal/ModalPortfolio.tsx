"use client"
import { Flex, Table, TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import { useAppSelector } from "@/lib/store/hooks";
import SellButton from "./SellButton";
import Total from "../Total";

export type PortfolioItemType = {
    title: string,
    quantity: number,
    sum: number,
    price: number
}

type PropsType = {
    data?: PortfolioItemType[]
}

export default function ModalPortfolio({ }: PropsType) {

    const { coins } = useAppSelector(state => state.portfolio);
    const data = Array.from(Object.entries(coins).map(coin => ({ title: coin[0], ...coin[1], key: coin[0] })));

    const columns: TableColumnsType<PortfolioItemType> = [
        {
            title: 'Валюта',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Цена, $',
            dataIndex: 'price',
            key: 'price',
            responsive: ['sm'],
            render: (_, record: PortfolioItemType) => `$${record.price}`
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Сумма, $',
            dataIndex: 'sum',
            key: 'sum',
            render: (_, record: PortfolioItemType) => `$${record.sum}`
        },
        {
            title: 'Продать',
            dataIndex: 'sell',
            key: 'sell',
            render: (_, record: PortfolioItemType) =>
                <SellButton record={record} />
        },
    ]

    return (
        <Flex
            vertical
            gap={20}
            style={{ paddingBlock: 20 }}
        >
            <Title level={3}>Ваш кошелек</Title>
            {!!data.length
                ? <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    size="large"
                    showHeader={false}
                    key={'portfolio'} />
                : <Title level={3} style={{ textAlign: 'center' }} type="secondary"
                >Пока пусто</Title>}
            <Flex justify="flex-end" style={{ width: '100%' }}>
                <Total />
            </Flex>
        </Flex>

    )
}
