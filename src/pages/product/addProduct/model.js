import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { getSpecsValArry, getTableData } from './components/utils'

const initialState = {
  isPreUpperShelf: false,
  isPreLowerShelf: false,
  isJoinGroup: false,
  selectSpecs: [],
  customSpecs: [],
  specsColumn: [],
  dataSource: [],
  imgs: [],
  editorState: null,
  isEdit: false,
  tempTableObj: {}
}

export default modelExtend(model, {
  namespace: 'addProduct',
  state: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/addProduct', pathname)) {
          dispatch({ type: 'updateState', payload: { ...initialState, isEdit: history.location.query.id ? true : false } })
        }
      })
    },
  },
  effects: {
    *getDataSource({ payload }, { call, put, select }) {
      const { selectSpecs, customSpecs, dataSource, tempTableObj } = yield select(_ => _.addProduct)
      const newDataSource = getTableData(getSpecsValArry(selectSpecs, customSpecs), dataSource, tempTableObj)
      yield put({ type: 'updateState', payload: { dataSource: newDataSource } })
    },
  },
  reducers: {

  },
})
