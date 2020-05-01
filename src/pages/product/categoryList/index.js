import React, { PureComponent } from 'react'
import { Page, PageTitle } from 'components'
import FirstCategory from './components/firstCategory'
import SecondaryCategory from './components/secondaryCategory'
import styles from './index.less'

export default class CategoryList extends PureComponent {
  render() {
    return (
      <Page inner className={styles.page}>
        <PageTitle/>
        <div className={styles.container}>
          {
            <div className='left'>
              <FirstCategory/>
            </div>
          }
          {
            <div className='right'>
              <SecondaryCategory/>
            </div>
          }
        </div>
      </Page>
    )
  }
}
