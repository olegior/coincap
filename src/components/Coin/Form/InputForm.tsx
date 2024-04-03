import { getLength, getQuantityStep, getSumStep } from '@/lib/helpers/priceToFixed'
import { Col, Form, FormInstance, InputNumber, Row } from 'antd'
import FormItem from 'antd/es/form/FormItem'

type PropsType = {
    data: {
        [key: string]: string
    },
    form: FormInstance
}
export default function InputForm({ data, form }: PropsType) {
    const price = +data.price
    const length = getLength(price);
    const quantityStep = getQuantityStep(length);
    const sumStep = getSumStep(price, length);

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
        <Form form={form} layout='horizontal' size='large'>
            <Row gutter={16}>
                <Col span={12}>
                    <FormItem name="sum" rules={[{ required: true, message: "Введите сумму" }]}>
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

                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem name="quantity" rules={[{ required: true, message: "Введите количество" }]}>
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
        </Form >
    )
}
