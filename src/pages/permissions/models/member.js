import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { arrayToTree } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'members',
  state: {
    treeData: [],
    query: {},
    searchDepartment: '所有部门',
    selectedKeys: [],
    expandedKeys: [],
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => { })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, selectedKeys } = yield select(_ => _.members)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, department_id: selectedKeys[0] || '', ...query, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.permissions.getMemberList, { page_size, ...others })
      yield put({
        type: 'querySuccess',
        payload: {
          list: data && data.data,
          pagination: {
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          }
        }
      })
    },
    *getDepartmentList({ payload }, { put, call, select }) {
      const { data } = yield call($api.permissions.getDepartmentList)
      const treeData = data.map(el => {
        el.value = el.id
        el.title = el.department_name
        return el
      })
      yield put({
        type: 'updateState',
        payload: {
          treeData: arrayToTree(treeData, 'id', 'parent_id', 'children')
        }
      })
    }
  }
})