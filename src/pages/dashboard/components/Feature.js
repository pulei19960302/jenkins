import React, { PureComponent } from 'react'
import { IconFont } from 'components'
import { router } from 'utils'
import { connect } from 'dva'
import styles from '../index.less'

@connect(({ app }) => ({ ...app }))
class Feature extends PureComponent {
  render() {
    const { user = {} } = this.props
    const { is_customer_service = false } = user

    return (
      <div className={styles.feature}>
        <div className={`${styles.title} ${styles.colorDark}`}>
          常用功能
        </div>
        <div className={styles.content}>
          {
            $api.product.addProduct.permission() && (
              <div onClick={() => { router.push('/product/addProduct') }}>
                <span className={styles.icon}>
                  <IconFont type="iconfabushangpin" />
                </span>
                <span>发布商品</span>
              </div>
            )
          }
          {
            $api.shop.getPageList.permission() && (
              <div onClick={() => { router.push('/shop/pageList') }}>
                <span className={styles.icon}>
                  <IconFont type="icondianpuzhuangxiu" />
                </span>
                <span>店铺装修</span>
              </div>
            )
          }
          {
            $api.user.userListEs.permission() && (
              <div onClick={() => { router.push('/user/userList') }}>
                <span className={styles.icon}>
                  <IconFont type="iconyonghuguanli" />
                </span>
                <span>用户管理</span>
              </div>
            )
          }
          {
            is_customer_service && (
              <div onClick={() => { router.push('/customerService/conversation') }}>
                <span className={styles.icon}>
                  <IconFont type="iconkefuzhongxin" />
                </span>
                <span>客服中心</span>
              </div>
            )
          }
          {
            $api.finance.financeList.permission() && (
              <div onClick={() => { router.push('/finance/financeList') }}>
                <span className={styles.icon}>
                  <IconFont type="iconcaiwuzonglan" />
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