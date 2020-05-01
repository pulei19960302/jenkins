/**
 * 固定分页组件
 * props:
 * paginationProps: antd的pagination相关props
 * stylePros: 额外样式
 */
import React from 'react'
import { Pagination } from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import MutipulBtns from 'components/MutipulBtns'

@connect(({ app }) => ({ app }))
class Pag extends React.Component {
  render() {
    const { collapsed } = this.props.app
    const width = collapsed ? 'calc(100% - 111px)' : 'calc(100% - 202px)'
    const { paginationProps, stylePros, btns, mutipulClick } = this.props
    const sty = {
      width,
      ...stylePros,
    }
    return (
      <div className={styles.pagination} style={sty}>
        <MutipulBtns btns={btns} mutipulClick={mutipulClick}></MutipulBtns>
        <Pagination {...paginationProps} />
      </div>
    )
  }
}
export default Pag
