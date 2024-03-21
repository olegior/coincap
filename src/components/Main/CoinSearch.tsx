"use client"
import { searchCoin } from '@/lib/store/features/search/searchSilce'
import { useAppDispatch } from '@/lib/store/hooks'
import { Space } from 'antd'
import Search from 'antd/es/input/Search'
import { debounce } from 'lodash'
import React, { ChangeEvent } from 'react'

export default function CoinSearch() {

    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(searchCoin(value))
    }, 500)

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    const handleSearch = (value: string) => {
        dispatch(searchCoin(value))
    }

    return (
        <Space>
            <Search
                onSearch={handleSearch}
                allowClear={true}
                placeholder='введите название...' size='large'
                onChange={handleChange}
            />
        </Space>
    )
}
