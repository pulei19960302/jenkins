import React, { PureComponent } from 'react'
import ReactEcharts from 'echarts-for-react'
import { Row, Col, Card } from 'antd'
import { Page } from 'components'
import getBarOptions1 from './getBarOptions1'
import getBarOptions2 from './getBarOptions2'
import getLineOptions1 from './getLineOptions1'
import getLineOptions2 from './getLineOptions2'
import getPieOptions1 from './getPieOptions1'
import getPieOptions2 from './getPieOptions2'
import getMapOptions from './getMapOptions'
import logo from 'assets/images/overlay.png'
import styles from './index.less'

class Demo extends PureComponent {
    render() {
        return (
            <div className={styles.fixed}>
                <div className={styles.overlay}>
                    <img className={styles.img} src={logo} />
                    <strong>开发中，敬请期待...</strong>
                </div>
                <Page inner>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card size="small" title="柱状图">
                                <ReactEcharts
                                    option={getBarOptions1()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title="柱状图">
                                <ReactEcharts
                                    option={getBarOptions2()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card size="small" title="饼状图">
                                <ReactEcharts
                                    option={getPieOptions1()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title="饼状图">
                                <ReactEcharts
                                    option={getPieOptions2()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card size="small" title="折线图">
                                <ReactEcharts
                                    option={getLineOptions1()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card size="small" title="折线图">
                                <ReactEcharts
                                    option={getLineOptions2()}
                                    style={{ width: '100%', height: '350px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Card size="small" title="地图">
                                <ReactEcharts
                                    option={getMapOptions()}
                                    style={{ width: '100%', height: '500px' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Page>
            </div>
        )
    }
}

export default Demo
