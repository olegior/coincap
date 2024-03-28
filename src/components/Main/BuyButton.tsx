"use client"
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { TableCoinAssetType } from '@/lib/types';

type PropsType = {
    coin: TableCoinAssetType
    modalHandler: (coin: TableCoinAssetType) => void

}
export default function BuyButton({ coin, modalHandler }: PropsType) {

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        modalHandler(coin)
    }

    return (
        <Button onClick={handleClick} ><PlusOutlined /></Button>
    )
}
