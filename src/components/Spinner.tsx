import React from 'react'
import { Flex } from 'antd'

export default function Spinner() {
    return (
        <Flex style={{ height: '100dvh' }} justify='center' align='center'>
            <div className="loader"></div>
        </Flex>
    )
}
