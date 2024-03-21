"use client"
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';

type PropsType = {
    coin: {
        [key: string]: string
    },
    // modal?: Omit<ModalStaticFunctions, 'warn'>;
    modalHandler: (coin: { [key: string]: string }) => void

}
export default function BuyButton({ coin, modalHandler }: PropsType) {

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        modalHandler(coin)
    }

    return (
        <Button onClick={handleClick}><PlusOutlined /></Button>
    )
}
