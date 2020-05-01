import React, { PureComponent } from 'react'
import { IconFont } from 'components'
import { router } from 'utils'
import styles from '../index.less'

class Feature extends PureComponent {
  render() {
    return (
      <div className={styles.feature}>
        <div className={`${styles.title} ${styles.colorDark}`}>
          常用功能
        </div>
        <div className={styles.content}>
          {
            $api.product.addProduct.permission() && (
              <div onClick={() => { router.push('/product/create') }}>
                <span className={styles.icon} style={{ background: '#91D5FF' }}>
                  <IconFont type="iconfabushangpin-w" />
                </span>
                <span>发布商品</span>
              </div>
            )
          }
          {
            $api.shop.getPageList.permission() && (
              <div onClick={() => { router.push('/shop/pageList') }}>
                <span className={styles.icon} style={{ background: '#87E8DE' }}>
                  <IconFont type="icondianpuzhuangxiu-w" />
                </span>
                <span>店铺装修</span>
              </div>
            )
          }
          {
            $api.user.userListEs.permission() && (
              <div onClick={() => { router.push('/user/userList') }}>
                <span className={styles.icon} style={{ background: '#B7EB8F' }}>
                  <IconFont type="iconyonghuguanli-w" />
                </span>
                <span>用户管理</span>
              </div>
            )
          }
          {
            $api.workorder.getServiceList.permission() && (
              <div onClick={() => { router.push('/customerService/conversation') }}>
                <span className={styles.icon} style={{ background: '#FFBB96' }}>
                  <IconFont type="iconkefuzhongxin-w" />
                </span>
                <span>客服中心</span>
              </div>
            )
          }
          {
            $api.finance.financeList.permission() && (
              <div onClick={() => { router.push('/finance/financeList') }}>
                <span className={styles.icon} style={{ background: '#D3ADF7' }}>
                  <IconFont type="iconcaiwuzonglan-w" />
                </span>
                <span>财务总览</span>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Feature