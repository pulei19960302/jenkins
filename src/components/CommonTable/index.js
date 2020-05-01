/**
 *
 * 如果需要使用 ant 自带的 table 分页 传入 tableProps = { pagination:true } 即可
 *
 *
 * props:
 * columns 必填
 *      设置 tableOverflow 为 true 开启长文本省略
 *      设置 previewImg 为 true 开启图片预览
 *
 * getList 必填 获取列表数据 会得到 { page,pageSize } 参数
 * loading 必填 列表 loading 布尔值
 * dataSource 必填 table数据源
 * columns 必填 table 常量
 * searchFields 非必填
 * pagination 非必填 如果不填将会使用 state 维护翻页 但同时会对 getList作出一点要求 参照 user/userDetail/components/RightPanel/RightPanel.js
 * pagination 为 false 关闭分页功能
 * onSearch 非必填 搜索回调
 * mutipulBtns 批量操作按钮 [ { name:名字,type:按钮type,key:批量标识,icon:按钮 icon,noCheck:boolean } ]
 * mutipulClick 批量操作回调
 * onDisabled 非必填 返回true时 对应行 不能进行批量操作
 *
 * pageProps, // 额外翻页组件参数
 * searchProp, // 额外搜索组件参数
 * tableProps, // 额外表格组件参数
 *      defaultSelectedRowKeys 默认选择
 */
import { Table, message } from 'antd'
import React, { PureComponent } from 'react'
import account from 'accounting'
import classnames from 'classnames'
import { SearchForm, Pagination, LinesEllipsis } from 'components'
import PreviewImg from 'components/PreviewImg'
import { pagination as statePagination } from 'utils/model'
export default class CommonTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: (props.tableProps && props.tableProps.defaultSelectedRowKeys) ? props.tableProps.defaultSelectedRowKeys : [],
      statePagination,
      selectedRows: null,
    }
  }
  componentDidMount = () => {
    this.props.onRef && this.props.onRef(this)
    const { getList, pagination } = this.props
    if (pagination === undefined) {
      getList({ page: 1, pageSize: statePagination.pageSize }).then(res => {
        this.resetPagination({ total: res })
      })
    }
  }

  clearSelectedRowKeys = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: null
    })
  }

  handleColumns = columns => {
    return columns.map(it => {
      if (it.tableOverflow) {
        if (it.dataFn) {
          it.render = (text, row) => <LinesEllipsis text={it.dataFn(row)} maxLine={it.maxLine || 1} />
        } else {
          it.render = text => <LinesEllipsis text={text} maxLine={it.maxLine || 1} />
        }
      }
      if (it.previewImg) {
        it.render = url => (
          <div
            className="imgItem"
            style={{ width: it.imgWidth, height: it.imgHeight, cursor: 'pointer' }}
            onClick={() => {
              PreviewImg({ imgUrl: url })
            }}
          >
            <img
              style={{ width: '100%', height: '100%', borderRadius: 2 }}
              src={url}
              alt=""
            />
          </div>
        )
      }
      if (it.money) {
        it.render = text => account.formatMoney(text, '￥')
      }
      if (!it.key) {
        it.key = it.dataIndex
      }
      return it
    })
  }
  handleMutipulClick = (key, field) => {
    if (
      (!this.state.selectedRowKeys ||
        this.state.selectedRowKeys.length === 0) &&
      !field.noCheck
    ) {
      message.warn('请至少选择一项')
      return
    }
    this.props.mutipulClick(key, this.state.selectedRowKeys, field, this.state.selectedRows)
  }
  resetPagination = ({ page, pageSize, total }) => {
    const statePagination = { ...this.statePagination }
    page && (statePagination.current = page)
    pageSize && (statePagination.pageSize = pageSize)
    total && (statePagination.total = total)
    this.setState({
      statePagination,
    })
  }
  render() {
    const {
      searchFields, // 搜索条件
      getList, // 更新数据fn
      loading,
      dataSource,
      pagination,
      onSearch,
      columns, // table 项
      pageProps, // 额外翻页组件参数
      searchProp, // 额外搜索组件参数
      tableProps, // 额外表格组件参数
      //   mutipulClick, // 批量操作回调
      mutipulBtns, // 批量操作按钮参数 [ { name:名字,type:按钮type,key:批量标识,icon:按钮 icon } ]
      onDisabled,
    } = this.props

    const { statePagination, selectedRowKeys } = this.state

    const { resetPagination } = this

    // const xLength = columns
    //   .map(it => it.width)
    //   .reduce((a, b) => +(a || 0) + +(b || 0))

    const extendTableProps = {
      rowKey: 'id',
      pagination: false,
      columns: this.handleColumns(columns),
      dataSource,
      loading,
      scroll: {
        x: 'max-content',
      },
      rowSelection:
        mutipulBtns && mutipulBtns.length
          ? {
            selectedRowKeys,
            onChange: (v, selectedRows) => {
              this.setState({
                selectedRowKeys: v,
                selectedRows,
              })
            },
            getCheckboxProps: (record) => ({
              disabled: (onDisabled && onDisabled(record)) || false,
            })
          }
          : undefined,
      ...tableProps,
    }
    const extendPageProp = Object.assign(
      {
        onChange: (page, pageSize) => {
          pagination === undefined && resetPagination({ page, pageSize })
          getList({ page, pageSize })
          //   this.setState({
          //     selectedRowKeys: [],
          //   })
        },
        onShowSizeChange: (page, pageSize) => {
          pagination === undefined && resetPagination({ page, pageSize })
          getList({ page: 1, pageSize })
        },
      },
      pagination || statePagination,
      pageProps
    )
    // 开启 antd table 自带 分页
    if (extendTableProps.pagination) {
      extendTableProps.pagination = extendPageProp
    }
    if (extendTableProps.pagination === false) {
      extendTableProps.pagination = false
    }
    const extendSearchProp = {
      onSearch: query => {
        pagination === undefined && resetPagination({ page: 1 })
        onSearch(query)
      },
      fields: searchFields,
      //   BtnGroup:
      //     mutipulBtns && mutipulBtns.length ? (
      //       <BtnGroup
      //         btns={mutipulBtns}
      //         mutipulClick={(key, field) => {
      //           this.handleMutipulClick(key, field)
      //         }}
      //       ></BtnGroup>
      //     ) : (
      //       undefined
      //     ),
      ...searchProp,
    }
    return (
      <div className={classnames(this.props.classnames)}>
        {searchFields && <SearchForm {...extendSearchProp}></SearchForm>}
        <Table {...extendTableProps} />
        {!extendTableProps.pagination && !!pagination && (
          <Pagination
            paginationProps={extendPageProp}
            stylePros={extendPageProp.stylePros}
            btns={mutipulBtns}
            mutipulClick={this.handleMutipulClick}
          />
        )}
      </div>
    )
  }
}
