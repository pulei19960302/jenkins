import React from 'react'
import { IconFont } from 'components'
import { Col, Row } from 'antd'
import styles from './index.less'
import AddressList from './addressList'
export default function({userAbstract,uid,fresh}) {
  const { caption,address,others,trade  } = userAbstract
  const panels = [
    {
      title: '资产信息',
      desc: `￥${caption.balance || 0}`,
      icon1:'iconzhanghuyue1',
      icon2: 'iconzhanghuyue',
    },
    {
      title: '佣金金额',
      desc: `￥${caption.reward || 0}`,
      icon1:'iconyongjinjine1',
      icon2: 'iconyongjinjine',
    },
    {
      title: '优惠券（张）',
      desc: caption.coupon,
      icon1:'iconyouhuiquan1',
      icon2: 'iconyouhuiquan',
    },
    {
      title: '积分',
      desc: caption.integral,
      icon1:'iconjifen2',
      icon2: 'iconjifen',
    },
  ]
  const deals = [
    {
      title: '最近下单',
      desc: trade.last_consumer_time || '--',
    },
    {
      title: '累计订单（笔）',
      desc: trade.total_order_num || 0,
    },
    {
      title: '累计消费',
      desc: trade.total_consumer_price || 0,
    },
    {
      title: '累计退款订单(笔)',
      desc: trade.total_refund_order_num || 0,
    },
    {
      title: '累计退款',
      desc: trade.total_refund_order_price || 0,
    },
  ]
  return (
    <div>
      <Title>资产信息</Title>
      <Row gutter={20}>
        {panels.map((it, i) => (
          <Panel key={i} {...it}></Panel>
        ))}
      </Row>
      <Title style={{ marginTop: 40 }}>交易信息</Title>
      <Row type="flex">
        {deals.map((it, index) => (
          <DealPanel key={index} {...it}></DealPanel>
        ))}
      </Row>
      <Title style={{ marginTop: 32 }}>收货地址</Title>
      <AddressList fresh={fresh} uid={uid} list={address.items}></AddressList>
      {/* <Title style={{ marginTop: 32 }}>账号</Title>
      <Row>
        <SimpleInfo title="开户行">暂无</SimpleInfo>
        <SimpleInfo title="账号">暂无</SimpleInfo>
        <SimpleInfo title="账户名">暂无</SimpleInfo>
      </Row>
      <Row className="mt12">
        <SimpleInfo title="支付宝">暂无</SimpleInfo>
        <SimpleInfo title="姓名">暂无</SimpleInfo>
      </Row>
      <Title style={{ marginTop: 32 }}>其他</Title>
      <Row>
        <SimpleInfo title="关注公众号时间">暂无</SimpleInfo>
        <SimpleInfo title="成为订货商时间">暂无</SimpleInfo>
        <SimpleInfo title="成为分销商时间">暂无</SimpleInfo>
      </Row> */}
    </div>
  )
}

const Title = ({ children, style }) => {
  return (
    <div
      className="fcblack7 fs16"
      style={{ fontWeight: 500, paddingBottom: 16, ...style }}
    >
      {children}
    </div>
  )
}
const Panel = ({ icon1,icon2, title, desc, span = 6 }) => {
  return (
    <Col span={span}>
      <div className={styles.panelBox}>
        <div style={{width:'100%'}}>
          <div className="fcblack5 fs16">{title}</div>
          <div
            className="fcblack7 fs20"
            style={{ fontWeight: 500, marginTop: 10,width:'100%',overflow:'hidden',textOverflow:'ellipsis' }}
          >
            {desc}
          </div>
        </div>
        <div>
          <IconFont className={styles.icon1} style={{ fontSize: 44 }} type={icon1}></IconFont>
          <IconFont className={styles.icon2} style={{ fontSize: 44 }} type={icon2}></IconFont>
        </div>
      </div>
    </Col>
  )
}
const DealPanel = ({ title, desc }) => {
  return (
    <div className={styles.dealPanel}>
      <div className="fs20 fcblack7">{desc}</div>
      <div className="fs16 fcblack5" style={{ marginTop: 22 }}>
        {title}
      </div>
    </div>
  )
}

const SimpleInfo = ({ title, children }) => {
  return (
    <Col span={8}>
      <span className="fcblack7 mr8" style={{fontWeight:400}}>{title}：</span>
      <span>{children}</span>
    </Col>
  )
}
