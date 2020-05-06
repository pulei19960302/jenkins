import React from 'react'
import { FrownOutlined } from '@ant-design/icons';
import { Page } from 'components'
import styles from './404.less'

const Error = () => (
  <Page inner>
    <div className={styles.error}>
      <FrownOutlined />
      <h1>抱歉，您无权限查看该页面！若要查看，请联系系统管理员</h1>
    </div>
  </Page>
)

export default Error
