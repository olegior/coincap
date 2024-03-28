import { Button, Flex } from "antd"
import Portfolio from "./Portfolio"
import Popular from "./Popular"
import Link from "next/link"
import { HomeOutlined } from '@ant-design/icons';


export default async function AppHeader() {
    return (
        <Flex className={'header'} justify="space-between" align="center"      >
            <Link href={'/'} style={{ padding: 10 }}>
                <HomeOutlined style={{ fontSize: 24 }} />
            </Link>
            <Popular />
            <Portfolio />
        </Flex>
    )
}
