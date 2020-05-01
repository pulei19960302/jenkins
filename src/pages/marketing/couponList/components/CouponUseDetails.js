import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
// import { searchFields, getColumns, typeFields } from './components/fields'
import { Modal, Drawer } from 'antd'
import { detailsSearchFields, getDetailsColumns } from './fields'

class CouponDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState = () => {
    return {
      list: [],
      pagination: {
        showTotal: total => `共 ${total} 条记录`,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        showQuickJumper: true,
        current: 1,
        total: 0,
        pageSize: 20,
      },
      searchFields: detailsSearchFields,
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.visible && (nextprops.visible !== this.props.visible)) {
      const { couponId = 0 } = nextprops
      this.getList({}, couponId)
    }
    // if (nextprops.visible) {
    //   // this.getList()
    // }
  }

  onSearch = query => {
    const { pagination } = this.state
    const { couponId = 0 } = this.props
    this.setState({
      pagination: {
        ...pagination,
        current: 1,
      },
    })

    this.getList(query, couponId)
  }

  getList = (query, coupon_id) => {
    const { pagination } = this.state
    const { pageSize, current: page } = pagination
    const params = { pageSize, page, ...query }

    $api.coupon.couponUseDetails({ ...params, coupon_id: parseInt(coupon_id) }).then((res) => {
      const { data } = res
      this.setState({
        list: data.items,
        pagination: {
          total: data.count,
          current: params.page,
          pageSize: params.pageSize,
        }
      })
    })
  }

  onClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  render() {
    const { visible } = this.props
    const { list, pagination } = this.state
    const { onSearch, getList } = this

    return (
      <Drawer
        title="优惠券列表/码库"
        placement="right"
        onClose={this.onClose}
        visible={visible}
        width={1000}>
        {
          visible &&
          <CommonTable
            dataSource={list}
            getList={getList}
            onSearch={onSearch}
            pagination={pagination}
            pageProps={{ width: 1000, right: 0 }}
            // loading={loading.effects[`couponList/getList`]}
            columns={getDetailsColumns()}
            searchFields={detailsSearchFields}
          // mutipulClick={mutipulClick}
          // mutipulBtns={mutipulBtns}
          // onDisabled={onDisabled}
          // searchProp={searchProp}
          />
        }
      </Drawer>
    )
  }
}

export default CouponDetails