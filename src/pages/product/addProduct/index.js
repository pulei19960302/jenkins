import React, { PureComponent } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import BraftEditor from 'braft-editor'
import { Form, Tabs, Button, message } from 'antd'
import { createUUID } from 'utils'
import { Page } from 'components'
import BaseInfo from './components/BaseInfo'
import ProductInfo from './components/ProductInfo'
import OtherInfo from './components/OtherInfo'
import { getAttrGroup } from './components/utils'
import styles from './index.less'
const { TabPane } = Tabs

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
@connect(({ addProduct }) => ({ ...addProduct }))
class addProduct extends PureComponent {
    formRef = React.createRef()
    state = {
        tabsKey: '1',
        loading: false
    }
    componentDidMount() {
        this.init()
        document.addEventListener('keypress', this.onKeyPressDo)
    }
    onKeyPressDo = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault()
        }
    }
    componentWillUnmount() {
        document.removeEventListener('keypress', this.onKeyPressDo)
    }
    init() {
        console.log(this.props)
        const { query } = this.props.history.location
        if (query.id) {
            $api.product.productDetail({ goods_id: query.id }).then(({ data }) => {
                const { base_data, market_price, warning_value, goods_desc_data, pre_start_end_set, attr_group, sku_group } = data
                const { title, sub_title, goods_brand_id, goods_category_ids,
                    freight_template_id, freight_insurance_id, weight, goods_code, supplier_id } = base_data
                const { desc, main_img, sub_imgs, video } = goods_desc_data
                const { start_type, pre_start_at, end_type, pre_end_at, label_ids, seckill_flag, seckill_begin_time, seckill_end_time, initial_sales_num } = pre_start_end_set
                this.formRef.current.setFieldsValue({
                    market_price,
                    warning_value,
                    base_data: {
                        title,
                        sub_title,
                        goods_brand_id: goods_brand_id ? goods_brand_id : undefined,
                        supplier_id,
                        goods_category_ids: goods_category_ids ? goods_category_ids.split(',').map(el => +el) : [],
                        freight_template_id,
                        freight_insurance_id,
                        weight,
                        goods_code,
                    },
                    goods_desc_data: {
                        video: video ? [video] : []
                    },
                    pre_start_end_set: {
                        start_type,
                        end_type,
                        pre_start_at: pre_start_at ? moment(pre_start_at) : undefined,
                        pre_end_at: pre_end_at ? moment(pre_end_at) : undefined,
                        label_ids: label_ids ? label_ids.split(',').map(el => +el) : [],
                        initial_sales_num,
                        seckill_flag,
                        seckill_time: (seckill_begin_time && seckill_end_time) ? [moment(seckill_begin_time), moment(seckill_end_time)] : undefined
                    }
                })
                let imgs = []
                main_img && imgs.push(main_img)

                this.props.dispatch({
                    type: 'addProduct/updateState', payload: {
                        editorState: desc ? BraftEditor.createEditorState(desc) : null,
                        imgs: sub_imgs && imgs.concat(sub_imgs),
                        customSpecs: attr_group.map(el => ({ ...el, id: createUUID() })),
                        dataSource: sku_group,
                        isPreUpperShelf: start_type === 2 ? true : false,
                        isPreLowerShelf: end_type === 2 ? true : false,
                        isJoinGroup: seckill_flag === 1 ? true : false,
                    }
                })
                console.log(data)
            })
        }
    }
    tabChange = (tabsKey) => {
        this.setState({
            tabsKey
        })
    }
    onFinish = (values) => {
        const { dataSource, selectSpecs, customSpecs, imgs, editorState } = this.props
        if (!dataSource.length) {
            message.warn('至少选择一个规格')
            this.setState({ tabsKey: '1' })
            return
        }
        const attr_group = getAttrGroup(selectSpecs, customSpecs)
        if (!attr_group) {
            message.warn('请将填写规格名称')
            this.setState({ tabsKey: '1' })
            return
        }
        if (!imgs || !imgs.length) {
            message.warn('请至少上传一张商品图片')
            this.setState({ tabsKey: '2' })
            return
        }
        const { base_data, goods_desc_data, pre_start_end_set } = values

        base_data.goods_category_ids = base_data.goods_category_ids ? base_data.goods_category_ids.join(',') : ''

        goods_desc_data.main_img = imgs[0]
        goods_desc_data.sub_imgs = imgs.slice(1)

        goods_desc_data.desc = editorState ? editorState.toHTML() : ""
        goods_desc_data.video = (goods_desc_data.video && goods_desc_data.video.length) ? goods_desc_data.video[0] : ""
        pre_start_end_set.seckill_begin_time = ''
        pre_start_end_set.seckill_end_time = ''
        if (pre_start_end_set.seckill_flag === 1) {
            if (!pre_start_end_set.seckill_time) {
                message.warn('请填写团购时间')
                return
            }
            pre_start_end_set.seckill_begin_time = moment(pre_start_end_set.seckill_time[0]).format("YYYY-MM-DD HH:00")
            pre_start_end_set.seckill_end_time = moment(pre_start_end_set.seckill_time[1]).format("YYYY-MM-DD HH:00")
        }
        delete pre_start_end_set.seckill_time
        if (pre_start_end_set.start_type === 2) {
            const pre_start_at = pre_start_end_set.pre_start_at
            pre_start_end_set.pre_start_at = pre_start_at ? pre_start_at.format('YYYY-MM-DD HH:mm:ss') : ''
        } else {
            pre_start_end_set.pre_start_at = ''
        }
        if (pre_start_end_set.end_type === 2) {
            const pre_end_at = pre_start_end_set.pre_end_at
            pre_start_end_set.pre_end_at = pre_end_at ? pre_end_at.format('YYYY-MM-DD HH:mm:ss') : ''
        } else {
            pre_start_end_set.pre_end_at = ''
        }
        pre_start_end_set.label_ids = pre_start_end_set.label_ids ? pre_start_end_set.label_ids.join(',') : ''


        const params = {
            ...values,
            attr_group: attr_group.map(el => {
                delete el.id
                return el
            }),
            sku_group: dataSource
        }
        console.log(params)
        const { query } = this.props.history.location
        if (query.id && !query.copy) {
            $api.product.editProduct({ ...params, goods_id: query.id }, { success: true, loadingFn: this.toggleLoading }).then(() => {
                this.props.history.push('/product/productList')
            })
        } else {
            $api.product.addProduct(params, { success: true, loadingFn: this.toggleLoading }).then(() => {
                this.props.history.push('/product/productList')
            })
        }
    }
    onFinishFailed = ({ values, errorFields }) => {
        message.warn('请将必填信息填写完整')
        this.setState({ tabsKey: '1' })
        console.log(values, errorFields)
    }
    toggleLoading = loading => {
        this.setState({
            loading,
        })
    }
    render() {
        const { tabsKey } = this.state
        console.log(tabsKey)
        return (
            <Page inner className={styles.addProduct}>
                <Form
                    ref={this.formRef}
                    {...layout}
                    initialValues={{
                        pre_start_end_set: { start_type: 3, end_type: 1, seckill_flag: 0 }
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Tabs activeKey={tabsKey}
                        onChange={this.tabChange}
                        tabBarExtraContent={<Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>}
                        className="tabs"
                        tabBarGutter={48}>
                        <TabPane tab="基本信息" key="1" forceRender>
                            <BaseInfo />
                        </TabPane>
                        <TabPane tab="商品介绍" key="2" forceRender>
                            <ProductInfo form={this.formRef} />
                        </TabPane>
                        <TabPane tab="附加信息" key="3" forceRender>
                            <OtherInfo form={this.formRef} />
                        </TabPane>
                    </Tabs>
                </Form>
            </Page>
        )
    }
}

export default addProduct
