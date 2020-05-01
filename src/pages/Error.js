import React from 'react'
import { FrownOutlined } from '@ant-design/icons';
import { Page } from 'components'
import styles from './404.less'

const Error = () => (
  <Page inner>
    <div className={styles.error}>
      <FrownOutlined />
      <h1>Error Page</h1>
      <h1>Sorry you have no permission to view our best web in universe</h1>
    </div>
  </Page>
)

export default Error
