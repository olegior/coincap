import { ConfigProvider } from "antd";

const withTheme = (
    node: JSX.Element,
    theme: { [key: string]: string | number | boolean | object }
) => (
    <ConfigProvider theme={theme}>
        {node}
    </ConfigProvider>
)

export default withTheme;