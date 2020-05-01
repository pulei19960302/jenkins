import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { searchFields } from './components/fields'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'supplierList',
  state: {
    list: [],
    pagination: {
      showTotal: total => `共 ${total} 条记录`,
      pageSizeOptions: ['10', '20', '30'],
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
    searchFields,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/supplierList', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, search } = yield select(_ => _.supplierList)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...search, ...payload }
      const { data } = yield call($api.supplier.supplierList, params)
      for (let i = 0; i < data.item.length; i++) {
        switch (data.item[i].company_type) {
          case 1:
            data.item[i].company_type = '自营'
            break
          case 2:
            data.item[i].company_type = '代发'
            break
        }
        if(data.item[i].license_img !== ''){
          data.item[i].license_img = data.item[i].license_img.split(',')
        }
      }
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.item,
          pagination: {
            total: data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})
