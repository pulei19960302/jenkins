import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Card, Row, Col, InputNumber, Select, DatePicker, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { FSwitch, ChooseLabel } from 'components'
@connect(({ addProduct }) => ({ ...addProduct }))
class OtherInfo extends PureComponent {
    state = {

    }

    handleGroupChange = (value) => {
        const { dispatch } = this.props
        dispatch({ type: 'addProduct/updateState', payload: { isJoinGroup: value === 1 ? true : false } })
    }

    render() {
        const { isJoinGroup } = this.props
        return (
            <Fragment>
                <Card title="销售信息" size="small">
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label={
                                    <Tooltip title="设置后，您的用户看到的销量=初始销量+实际销量" placement="topLeft">
                                        初始销量<InfoCircleOutlined />
                                    </Tooltip>
                                }
                                name={['pre_start_end_set', 'initial_sales_num']}
                            >
                                <InputNumber min={0} precision={0} placeholder="请填写初始销量" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="商品标签"
                                name={['pre_start_end_set', 'label_ids']}
                            >
                                <ChooseLabel placeholder="请选择标签（最多三个）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <Form.Item
                                labelCol={{ span: 16 }}
                                wrapperCol={{ span: 8 }}
                                label="是否参团"
                                name={['pre_start_end_set', 'seckill_flag']}
                            >
                                <FSwitch onChange={this.handleGroupChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            {
                                isJoinGroup &&
                                <Form.Item
                                    colon={false}
                                    labelCol={{ span: 1 }}
                                    wrapperCol={{ span: 23 }}
                                    label=" "
                                    name={['pre_start_end_set', 'seckill_time']}
                                >
                                    <DatePicker.RangePicker
                                        showTime={{ format: 'HH' }}
                                        format="YYYY-MM-DD HH:00"
                                        placeholder={['团购开始时间', '团购结束时间']}
                                        getPopupContainer={triggerNode => triggerNode.parentElement}
                                    />
                                </Form.Item>
                            }
                        </Col>
                    </Row>
                </Card>
            </Fragment>
        )
    }
}

export default OtherInfo
