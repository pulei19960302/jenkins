import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { SWITCH_TYPE } from './constant'

export default modelExtend(model, pageModel, {
  namespace: 'newCategory',
  state: {
    treeData: [],
    selectedKeys: [],
    expandedKeys: [],
    list: [],
    currentId: null,
    currentStatus: SWITCH_TYPE.ENABLE  // 1 启用 2
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/categoryList', pathname)) {
          dispatch({ type: 'getTreeData' })
        }
      })
    },
  },
  reducers: {
    updateCurrentStatus(state, { payload }) {
      const { treeData} = state;
      const filterArr = treeData.filter(item => String(item.id) === payload.currentId)
      return {
        ...state,
        currentStatus: filterArr && filterArr[0].status
      }
    }
  },
  effects: {
    * getTreeData({ payload }, { put, call, select }) {
      const params = { pid: 0, type: 0, ...payload }
      const { currentId } = yield select(_ => _.newCategory)
      const { data } = yield call($api.category.categoryList, params)
      const { item } = data;
      console.log(currentId, 'currentId')
      const id = currentId ? String(currentId) : String(item[0].id);
        yield put({
        type: 'updateState',
        payload: {
          treeData: item,
          currentId: id,
          selectedKeys: [id]
        },
      })
      yield put({ type: 'updateCurrentStatus', payload: { currentId: id }})
      yield put({ type: 'getList', payload: { pid: id }})
    },

    * getList({ payload }, { put, call, select }) {
      const { query, pagination, currentId } = yield select(_ => _.newCategory)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload, pid: currentId, type: 0 }
      const { data } = yield call($api.category.categoryList, params)
      yield put({
        type: 'updateState',
        payload: {
          list: data && data.item,
          pagination: {
            ...pagination,
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})
