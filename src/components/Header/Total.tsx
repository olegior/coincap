"use client"
import { useAppSelector } from '@/lib/store/hooks';
import { Flex } from 'antd'
import Text from 'antd/es/typography/Text';

export default function Total() {
    const { total, change } = useAppSelector(state => state.portfolio)
    const color = !change.includes('-') ? 'lawngreen' : 'red'
    return (
        <Flex vertical style={{ userSelect: 'none' }}>
            <Text strong style={{ textWrap: 'nowrap' }}>${total}</Text>
            {!change.includes('NaN') &&
                <Text style={{ textWrap: 'nowrap', color, fontSize: '0.8rem'}}>{change}</Text>
            }
        </Flex >
    )
}
