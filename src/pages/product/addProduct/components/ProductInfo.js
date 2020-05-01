import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form, Card, Row, Col, } from 'antd'
import { UploadImg, UploadVideo, Editor } from 'components'

@connect(({ addProduct }) => ({ ...addProduct }))
class ProductInfo extends PureComponent {
    state = {

    }
    imgChange = (imgs) => {
        this.props.dispatch({ type: 'addProduct/updateState', payload: { imgs } })
    }
    handleChangeEditor = (editorState) => {
        this.props.dispatch({ type: 'addProduct/updateState', payload: { editorState } })
    }
    render() {
        const { imgs, editorState } = this.props
        const imgWrapperWidth = imgs.length === 5 ? 112 * 5 + 16 : 112 * imgs.length + 112 + 16
        return (
            <Fragment>
                <Card title="商品主图" size="small">
                    <Row>
                        <Col span={2}>
                            <Form.Item
                                className="required"
                                labelCol={{ span: 20 }}
                                label="商品图片"
                            >
                            </Form.Item>
                        </Col>
                        <Col style={{ width: imgWrapperWidth }}>
                            <UploadImg pic={imgs} fileTotalCount={5} picSize={1} dataChange={this.imgChange} />
                        </Col>
                        <Col style={{ paddingTop: 10 }}>
                            <p className="uploadInfo">1. 建议尺寸：800 x 800 px</p>
                            <p className="uploadInfo">2. 大小：100k 以内</p>
                            <p className="uploadInfo">3. 数量：限制在 5 张以内</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}>
                            <Form.Item
                                labelCol={{ span: 20 }}
                                label="商品视频"
                            >
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name={['goods_desc_data', 'video']}
                            >
                                <UploadVideo fileTotalCount={1} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="图文介绍" size="small">
                    <Row>
                        <Col style={{ width: 375 }}>
                            <div className="pageContentContainer">
                                <div className="pageTitle">
                                    <span>商品详情预览</span>
                                </div>
                                <div className="editorPreview" dangerouslySetInnerHTML={{ __html: editorState ? editorState.toHTML() : '' }} />
                            </div>
                        </Col>
                        <Col flex="1 0 0">
                            <div className="editorContainer">
                                <Form.Item
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Editor editorState={editorState} onChange={this.handleChangeEditor} />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Fragment >
        )
    }
}

export default ProductInfo
