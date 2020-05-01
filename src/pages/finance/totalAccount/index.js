import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, PageTitle, SearchForm, Pagination } from 'components'
import { getSearchFields, getColumns } from './components/fields'
import Columns from '../components/Columns'
import styles from './index.less'

@connect(({ totalAccount, loading }) => ({ totalAccount, loading }))
class TotalAccount extends PureComponent {
  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'totalAccount/onSearch', payload })
    dispatch({ type: 'productProfitList/getList', payload })
    // 个人觉得，这里，onSearch 已经去更新query 的信息了，那么，getList，按理说， 就不该，再去，发送payload 了
  }

  geList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'productProfitList/getList', payload })
    //payload 这里，到底，有没有用？？？可以再 仔细 看看 逻辑   看看到底，请求接口的时候，过滤条件是query 还是payload             
  }

  renderDetails(info = {}, key = '') {
    const columnsFields = getColumns()
    return (
      <div key={key} className={`${styles.flex} ${styles.info}`}>
        {
          columnsFields && columnsFields.map((field) => {
            if (field.key !== '日期') {
              return field.render(info, field)
            }
            return null
          })
        }
      </div>
    )
  }

  renderList() {
    const { totalAccount } = this.props
    const { list = [] } = totalAccount

    //暂定数据结构
    // list: [{
    //   date: 20190923,
    //   infos: [
    //     {
    //       account: '系统',
    //       initialFund: '初始资金',
    //     }
    //     ,{
    //       account: '系统',
    //       initialFund: '初始资金',
    //     }
    //   ]
    // }]

    const listData = list && list.map((data, index) => {
      const { infos } = data
      return (
        <div key={index}>
          <div>20190923</div> {/* 日期显示 */}
          <div>
            {infos && infos.map((info, key) => (
              this.renderDetails(info, key)
            ))}
          </div>
        </div>
      )
    })

    return listData
  }

  renderStaticList() {
    return (
      <div className={`${styles.flex} ${styles.list}`}>
        <div className={`${styles.flex} ${styles.date}`}>20190923</div>
        <div className={styles.infos}>
          {this.renderDetails()}
          {this.renderDetails()}
          {this.renderDetails()}
        </div>
      </div>
    )
  }

  render() {
    const { totalAccount, loading } = this.props
    const { list = [], pagination, query } = totalAccount

    const btns = [
      {
        type: 'export',
        name: '导出',
        handleClick: () => { },
      }
    ]

    const searchFormProps = {
      search: '',
      fields: getSearchFields({}), //从后谈返回对账状态 并传入 enum 从 app model 获取 对应的 enums
      onSearch: this.onSearch
    }

    const paginationProps = {
      ...pagination,
      onChange: (page, pageSize) => { this.geList({ page, pageSize }) },
      onShowSizeChange: (page, pageSize) => { this.geList({ page: 1, pageSize }) }
    }

    return (
      <Page inner>
        <PageTitle btns={btns} />
        <SearchForm {...searchFormProps} />
        <Columns fields={getColumns()} />
        {this.renderList()}
        {this.renderStaticList()}
        <Pagination paginationProps={paginationProps} />
      </Page>
    )
  }
}

export default TotalAccount