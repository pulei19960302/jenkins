import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Card, Row, Col, Input, InputNumber, Radio, DatePicker } from 'antd'
import { ChooseCat, CommonSelect } from 'components'
import SpecsInfo from './SpecsInfo'
import PriceInfo from './PriceInfo'
const TextArea = Input.TextArea
@connect(({ addProduct }) => ({ ...addProduct }))
class BaseInfo extends PureComponent {
    state = {

    }
    componentDidMount() {
    }
    upperShelf = (e) => {
        const { value } = e.target
        const { dispatch } = this.props
        dispatch({ type: 'addProduct/updateState', payload: { isPreUpperShelf: value === 2 ? true : false } })
    }
    lowerShelf = (e) => {
        const { value } = e.target
        const { dispatch } = this.props
        dispatch({ type: 'addProduct/updateState', payload: { isPreLowerShelf: value === 2 ? true : false } })
    }
    render() {
        const { isPreUpperShelf, isPreLowerShelf, isEdit } = this.props
        return (
            <Fragment>
                <Card title="基本信息" size="small">
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="商品名称"
                                name={['base_data', 'title']}
                                rules={[{ required: true, message: '请填写商品名称' }]}
                            >
                                <TextArea placeholder="请填写商品名称(限100字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={100} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="副标题"
                                name={['base_data', 'sub_title']}
                            >
                                <TextArea placeholder="请填写副标题(限300字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="商品编码"
                                name={['base_data', 'goods_code']}
                            >
                                <Input placeholder="请输入商品编码(未填写则系统生成)" disabled={isEdit} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>

                        <Col span={8}>
                            <Form.Item
                                label="运费模板"
                                name={['base_data', 'freight_template_id']}
                                rules={[{ required: true, message: '请选择运费模板' }]}
                            >
                                <CommonSelect type="freightTemplate" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="运费险"
                                name={['base_data', 'freight_insurance_id']}
                                rules={[{ required: true, message: '请选择运费险' }]}
                            >
                                <CommonSelect type="freightInsurance" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="重量(kg)"
                                name={['base_data', 'weight']}
                            >
                                <InputNumber placeholder="请填写商品重量" min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="商品类目"
                                name={['base_data', 'goods_category_ids']}
                                rules={[{ required: true, message: '请选择商品类目' }]}
                            >
                                <ChooseCat />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="供应商"
                                name={['base_data', 'supplier_id']}
                                rules={[{ required: true, message: '请选择供应商' }]}
                            >
                                <CommonSelect type="supplier" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="商品品牌"
                                name={['base_data', 'goods_brand_id']}
                            >
                                <CommonSelect type="brand" selectPorps={{ allowClear: true }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="规格及价格" size="small">
                    <SpecsInfo />
                    <PriceInfo />
                    <Row style={{ marginTop: 12 }}>
                        <Col span={8}>
                            <Form.Item
                                label="市场价"
                                name="market_price"
                                rules={[{ required: true, message: '请填写市场价' }]}
                            >
                                <InputNumber min={0} placeholder="请填写市场价" precision={0} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="库存阈值"
                                name="warning_value"
                            >
                                <InputNumber min={0} placeholder="请填写库存警示阈值" precision={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="上下架设置" size="small">
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['pre_start_end_set', 'start_type']}
                                label="上架设置"
                                rules={[{ required: true, message: "请选择预上架设置" }]}
                            >
                                <Radio.Group onChange={this.upperShelf}>
                                    <Radio value={1}>立即上架</Radio>
                                    <Radio value={2}>预上架</Radio>
                                    <Radio value={3}>暂不上架</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {
                                isPreUpperShelf &&
                                <Form.Item
                                    name={['pre_start_end_set', 'pre_start_at']}
                                    label="预上架时间"
                                    rules={[{ required: true, message: "请选择预上架时间" }]}
                                >
                                    <DatePicker showTime placeholder="请选择预上架时间" />
                                </Form.Item>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name={['pre_start_end_set', 'end_type']}
                                label="下架设置"
                                rules={[{ required: true, message: "请选择预下架设置" }]}
                            >
                                <Radio.Group onChange={this.lowerShelf}>
                                    <Radio value={1}>售完下架</Radio>
                                    <Radio value={2}>预下架</Radio>
                                    <Radio value={3}>永不下架</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {
                                isPreLowerShelf &&
                                <Form.Item
                                    name={['pre_start_end_set', 'pre_end_at']}
                                    label="预下架时间"
                                    rules={[{ required: true, message: "请选择预下架时间" }]}
                                >
                                    <DatePicker showTime placeholder="请选择预下架时间" />
                                </Form.Item>
                            }
                        </Col>
                    </Row>
                </Card>
            </Fragment>
        )
    }
}

export default BaseInfo
