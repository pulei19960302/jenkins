import React, { useState, useEffect } from 'react'

import '@ant-design/compatible/assets/index.css';
import { Button, Row, InputNumber, Form, Spin } from 'antd';
import { Page } from 'components'
import PanelTitle from './components/panelTitle'
import DistributionBlock from './components/distributionBlock'
import { createUUID } from 'utils'
import styles from './index.less'
import { func } from 'prop-types';


// 创建消费积分 项
export const getOrderItem = ({ integral = '', integral_way = 3 } = {}) => {
  return {
    uuid: createUUID(),
    integral_way,
    integral
  }
}

// 消费积分 初始数组
const baseOrderItems = [
  getOrderItem(),
  getOrderItem(),
  getOrderItem(),
]

// 分享积分 初始数组
const baseShareData = [
  { integral: '', uuid: createUUID() },
  { integral: '', uuid: createUUID() },
  { integral: '', uuid: createUUID() },
]

const IntegralSet = () => {
  let [form] = Form.useForm()
  let [loading, setLoading] = useState(true)
  let [orderData, setOrderData] = useState(baseOrderItems)
  let [orderSwitch, setOrderSwitch] = useState(0)
  let [shareData, setShareData] = useState(baseShareData)
  let [shareSwitch, setShareSwitch] = useState(0)

  useEffect(() => {
    $api.system.getIntegral({}, { loadingFn: setLoading })
      .then(({ data }) => {
        let { order, share } = data || {}

        if (order) {
          setOrderSwitch(order.switch)
          order.data.length && setOrderData(order.data.map((item) => ({ ...item, uuid: createUUID() })))
        }

        if (share) {
          setShareSwitch(share.switch)
          share.data.length && setShareData(share.data.map(item => {
            let uuid = createUUID()
            form.setFieldsValue({
              [uuid]: item.integral
            })
            return { ...item, uuid }
          }))
        }
      })
  }, [])

  function onFieldsChange(field, Fields) {
    console.log(">", field)

  }

  // 提交修改
  function onFinish(values) {
    let params = {
      order: {
        switch: orderSwitch,
        data: orderData.map((item) => ({ ...item, uuid: undefined }))
      },
      share: {
        switch: shareSwitch,
        data: shareData.map(({ integral, uuid }) => {
          return { integral: values[uuid] || integral }
        })
      }
    }

    // console.log("shareData", shareData)
    // console.log("params.share.data", params.share.data)
    // setShareData(params.share.data)
    // return
    $api.system.setIntegral({ data: params }, { loadingFn: setLoading })
  }

  function onChange(key, index, res) {
    const data = JSON.parse(JSON.stringify(orderData))
    switch (key) {
      case 'del':
        data.splice(index, 1)
        break
      case 'add':
        data.push(getOrderItem({}))
        break
      case 'change':
        data.splice(index, 1, res)
        break
    }
    setOrderData(data)
  }

  return (
    <Page inner style={{ padding: 0, backgroundColor: 'inherit' }}>

      {/* 消费积分 */}
      <div className={styles.pageBlockContainer}>
        <PanelTitle
          onChange={setOrderSwitch}
          defaultChecked={orderSwitch}
          title='消费积分'
          desc={[`，产生积分`, `，不产生积分`]}
        />

        {orderSwitch === 1 && (
          <div className={`${styles.panelContainer} animated fadeIn`}>
            <div className={styles.blockContainer}>
              {orderData.map((it, index, arr) => (
                <DistributionBlock
                  key={it.uuid}
                  item={it}
                  index={index}
                  length={arr.length}
                  onChange={onChange}
                  type={1}
                />
              ))}
            </div>
            <div className="fcblack5 fs12">
              注意：积分仅支持按推荐关系发放；
                </div>
            <div className="fcblack5 fs12">
              积分在订单交易完成后发放，订单取消，则积分退换商家。
                </div>
          </div>
        )}
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 7, lg: 6, xl: 4, xxl: 3 }}
        onValuesChange={onFieldsChange}
      >
        <div className={styles.pageBlockContainer}>
          {/* 分享积分 */}
          <PanelTitle
            onChange={setShareSwitch}
            defaultChecked={shareSwitch}
            title='分享积分'
            help='当有人通过分享链接或者分销名片成为分享者下级，将给分享者发放积分。'
            desc={[]}
          />

          {shareSwitch === 1 && (
            <div style={{ padding: '20px 44px' }}>
              {
                shareData.map((item, index) => (
                  <Form.Item
                    key={item.uuid + "test"}
                    label={`分享者${index > 0 ? `${''.padEnd(index, '上')}级` : ''}获得积分`}
                  >
                    <Form.Item noStyle
                      name={[item.uuid]}
                      rules={[{ required: true, message: '请输入大于等于0的整数' }]}
                    >
                      <InputNumber
                        min={0}
                        placeholder='请输入' style={{ width: 164 }}
                      />
                    </Form.Item>
                    <span style={{ paddingLeft: 20 }}>积分</span>
                  </Form.Item>
                ))
              }
            </div>
          )}
        </div>

        {
          $api.system.setIntegral.permission() && (
            <Row
              type="flex"
              justify="center"
              style={{ backgroundColor: '#fff', padding: 12 }}
            >
              <Button loading={loading} type="submit" htmlType="submit">提交</Button>
            </Row>
          )
        }
      </Form>

      {
        loading && <div className={styles.pageLoading}>
          <Spin />
        </div>
      }
    </Page>
  )
}

export default IntegralSet