"use client"
import { searchCoin } from '@/lib/store/features/search/searchSilce'
import { useAppDispatch } from '@/lib/store/hooks'
import { Input, Space } from 'antd'
import { debounce } from 'lodash'
import React, { ChangeEvent } from 'react'
import { SearchOutlined } from '@ant-design/icons';

export default function CoinSearch() {

    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(searchCoin(value))
    }, 500)

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    return (
        <Space>
            <Input
                onChange={handleChange}
                placeholder='введите название...'
                size='large'
                allowClear={true}
                prefix={<SearchOutlined />}
            />
        </Space>
    )
}
