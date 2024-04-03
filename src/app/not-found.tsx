
import { Flex } from "antd"
import Link from "antd/es/typography/Link"

export default function NotFound() {
    return (
        <Flex justify="center" align="center"
            style={{ height: 'calc(100dvh - var(--header-height))' }}
            vertical>
            <h2>Произошла ошибка</h2>
            <Link strong href="/">НА ГЛАВНУЮ</Link>
        </Flex>
    )
}
