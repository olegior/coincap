import { Button, Flex } from "antd"
import Portfolio from "./Portfolio"
import Popular from "./Popular"
import Link from "next/link"
import { HomeOutlined } from '@ant-design/icons';
import { getCoinsAssets } from "@/lib/helpers/api";


const getPopularCoins = async () => await getCoinsAssets(3, 0);



export default async function AppHeader() {
    const popular = await getPopularCoins();
    return (
        <Flex className={'header'} justify="space-between" align="center"      >
            <Link href={'/'} style={{ padding: 10 }}>
                <HomeOutlined style={{ fontSize: 24 }} />
            </Link>
            <Popular data={popular} />
            <Portfolio />
        </Flex>
    )
}
