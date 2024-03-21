import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'

type PropsType = {
    data: {
        [key: string]: string
    },
    form: FormInstance
}
export default function BuyForm({ data, form }: PropsType) {
    const price = +data.price;

    const length = Math.trunc(price).toString().length - 1;
    const quantityStep = +(10 ** (-length)).toFixed(length);
    const sumStep = +(price / 10 ** length).toFixed(2);

    const handleInput = (prop: string, length: number) => {
        return (value: number | string | null) => {
            const calcValue = prop === 'sum' ? (Number(value) * price) : (Number(value) / price)
            if (!Number.isNaN(value)) {
                form.setFieldValue(prop, +(calcValue).toFixed(length))
            }
            if (!value) {
                form.setFieldValue(prop, null)
            }
        }
    }

    const handleSum = handleInput('quantity', length);
    const handleQuantity = handleInput('sum', 2)

    const handleSumOnEnter = () => {
        const quanitity = form.getFieldValue('quantity')
        form.setFieldValue('sum', +(quanitity * price).toFixed(2))
    }


    return (
        <Form form={form} layout='inline' size='large' style={{ paddingBlock: 30 }}>
            <Row>
                <Col span={12}>
                    <FormItem name="sum">
                        <InputNumber
                            type='number'
                            min={sumStep}
                            step={sumStep}
                            onChange={handleSum}
                            style={{ width: '100%' }}
                            changeOnWheel
                            placeholder='USD'
                            prefix='$'
                            size='large'
                            onPressEnter={handleSumOnEnter}
                        // formatter={(value) => value?.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                        // parser={(value) => +(value.replace(/\s+/g, ''))}
                        // formatter={(value) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        // parser={(value) => value?.toString()!.replace(/\$\s?|(,*)/g, '')}
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem name="quantity"            >
                        <InputNumber
                            type='number'
                            min={quantityStep}
                            max={100000}
                            step={quantityStep}
                            style={{ width: '100%' }}
                            onChange={handleQuantity}
                            placeholder={data.name}
                            prefix={data.symbol}
                            size='large'
                        />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    )
}
