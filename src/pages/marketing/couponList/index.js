import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
import { searchFields, getColumns, typeFields } from './components/fields'
import { Modal } from 'antd'
import { COUPON_STATUS } from '../constants'
import CouponDetails from './components/CouponUseDetails'

@connect(({ couponList, loading }) => ({
  couponList,
  loading,
}))
class CouponList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      couponId: '',
    }
  }

  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `couponList/onSearch`, payload: query })
    dispatch({ type: `couponList/getList`, payload: query })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `couponList/getList`,
      payload,
    })
  }

  // add coupon
  handleRouteTo = () => {
    const { history, dispatch } = this.props
    //empty couponForm data in couponList modal
    dispatch({
      type: 'couponAdd/updateState',
      payload: {
        couponForm: {},
        productList: [],
      }
    })

    history.push({
      pathname: `/marketing/couponAdd`,
      payload: {
        create: true
      }
    })
  }

  //more operations
  tableMoreClick = (key, row) => {
    let { id } = row;

    if (id) {
      id = id.toString();
      switch (key) {
        case 'publish':
          this.publishCoupon(id);
          break;
        case 'copy':
          this.editCoupon(id, 'copy');
          break;
        case 'delete':
          this.deleteCoupon(id);
          break;
        case 'invalid':
          this.invalidCoupon(id);
          break;
        case 'dispatch':
          this.dispatchCoupon(id);
          break;
        case 'edit':
          this.editCoupon(id);
          break;
        case 'details':
          this.showCouponUseDetails(id);
          break;
        case 'view':
          this.editCoupon(id, false, 'view');
          break;
        default:
          break;
      }
    }
  }

  //publish coupon
  publishCoupon = (ids, callback) => {
    $api.coupon.publishCoupon({ coupon_id_str: ids }, { success: true }).then(_ => {
      this.getList()
    })
  }

  //edit coupon & copy coupon & view coupon
  editCoupon = (id, copy = false, view = false) => {
    const { history } = this.props
    let query
    if (copy) {
      query = { id, copy }
    } else if (view) {
      query = { id, view }
    } else {
      query = { id }
    }
    // const query = copy ? { id, copy } : { id }

    history.push({
      pathname: `/marketing/couponAdd`,
      query: query
    })
  }

  //delete coupon
  deleteCoupon = (ids, callback) => {
    Modal.confirm({
      title: '确认删除所选用户么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.coupon.deleteCoupon({ coupon_id_str: ids }, { success: true }).then(_ => {
          this.getList()
        })
      },
    })
  }

  //invalid coupon
  invalidCoupon = (ids, callback) => {
    Modal.confirm({
      title: '作废后不可恢复，是否确认作废?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.coupon.invalidCoupon({ coupon_id_str: ids }, { success: true }).then(_ => {
          this.getList()
        })
      },
    })
  }

  //dispatch coupon
  dispatchCoupon = () => {
  }

  //show coupon using details
  showCouponUseDetails = (id) => {
    this.setState({
      detailVisible: true,
      couponId: id,
    })
  }

  hideCouponUseDetails = () => {
    this.setState({
      detailVisible: false,
      couponId: '',
    })
  }

  // bulk operation
  mutipulClick = (key, items) => {
    const ids = items.join(',')
    switch (key) {
      case 'delete':
        this.deleteCoupon(ids);
        break;
      default:
        break;
    }
  }

  //disable multiple props when coupon is published
  onDisabled = (record) => {
    const { status } = record
    return status !== COUPON_STATUS.UNPUBLISHED
  }

  getCouponDetails = () => {
    const { detailVisible, couponId } = this.state

    return <CouponDetails visible={detailVisible} couponId={couponId} onClose={this.hideCouponUseDetails}></CouponDetails>
  }

  render() {
    const { getList, onSearch, mutipulClick, onDisabled } = this
    const { couponList, loading } = this.props
    const { list, pagination } = couponList

    const mutipulBtns = [
      {
        name: '批量删除',
        key: 'delete',
        permission: $api.coupon.deleteCoupon.permission(),
      },
    ].filter(el => el.permission)

    const btns = [
      {
        type: 'primary',
        name: '新增',
        handleClick: () => { this.handleRouteTo() },
        permission: $api.coupon.addCoupon.permission(),
      },
    ].filter(el => el.permission)

    return (
      <Page inner>
        <PageTitle btns={btns} />
        <CommonTable
          dataSource={list}
          getList={getList}
          onSearch={onSearch}
          pagination={pagination}
          loading={loading.effects[`couponList/getList`]}
          columns={getColumns.call(this, typeFields)}
          searchFields={searchFields}
          mutipulClick={mutipulClick}
          mutipulBtns={mutipulBtns}
          onDisabled={onDisabled}
        // searchProp={searchProp}
        />
        {this.getCouponDetails()}
      </Page>

    )
  }
}

export default CouponList