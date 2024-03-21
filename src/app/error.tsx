"use client"

import { Flex, Typography } from "antd"
import Link from "antd/es/typography/Link"

const {Title} = Typography

export default function error() {
    return (
        <Flex justify="center" align="center" style={{ height: '100dvh' }} vertical>
            <Title level={2}>Произошла ошибка</Title>
            <Link strong href="/">НА ГЛАВНУЮ</Link>
        </Flex>
    )
}
