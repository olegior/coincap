import { useState } from "react";

import { Button, InputNumber, Popover, Space } from "antd";
import { PortfolioItemType } from "./ModalPortfolio";
import Compact from "antd/es/space/Compact";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons"

import { sellCoin } from "@/lib/store/features/portfolio/portfolioSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { getLength, getQuantityStep } from "@/lib/helpers/priceToFixed";

type PropsType = {
    record: PortfolioItemType
}

export default function SellButton({ record }: PropsType) {

    const { price, sum } = record;
    const length = getLength(price);
    const quantityStep = getQuantityStep(length);

    const [showPopover, setShowPopover] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const dispatch = useAppDispatch();

    const handlePopover = () => {
        setShowPopover(prev => !prev)
        setQuantity(record.quantity)
    }

    const handleSellCoin = () => {
        dispatch(sellCoin({ [record.title]: { quantity, price, sum } }))
        setShowPopover(false);
        setQuantity(0)
    }

    const handleQuantityChange = (data: number | null) => {
        if (data)
            setQuantity(data)
    }

    const InputForm = <Compact size="large">
        <Button onClick={handlePopover}><CloseOutlined /></Button>
        <InputNumber
            type='number'
            step={quantityStep}
            value={quantity}
            min={0}
            max={record.quantity}
            onChange={handleQuantityChange}
        />
        <Button onClick={handleSellCoin} ><ShoppingCartOutlined /></Button>
    </Compact>

    return (
        <Space>
            <Button size="large" onClick={handlePopover}><ShoppingCartOutlined /></Button>
            <Popover open={showPopover} placement="left" content={InputForm} />
        </Space>
    )
}
