import React from 'react'
import { Flex } from 'antd'
import style from './Spinner.module.css'

export default function Spinner() {
    return (
        <Flex justify='center' align='center'>
            <div className={style.loader}></div>
        </Flex>
    )
}
