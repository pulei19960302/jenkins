import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { searchFields } from './components/fields'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'userList',
  state: {
    list: [],
    pagination,
    tabs:[],
    tabsEnum:{},
    tabsKey: '-1',
    searchFields,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/user/userList', pathname)) {
          dispatch({ type: 'getList' })
          dispatch({type:'getTabs'})
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, tabsKey: member_type_id } = yield select(
        _ => _.userList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, member_type_id, ...query, ...payload }
      if(+params.member_type_id===-1){
          delete params.member_type_id
      }
      params.page_size = params.pageSize
      delete params.pageSize
      const { data } = yield call($api.user.userListEs, params)
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.data,
          pagination: {
            total: data.total,
            current: params.page,
            pageSize: params.page_size,
          },
        },
      })
    },
    *getTabs({ payload }, { put, call, select }){
        const { data } = yield call($api.user.userLevelList,{},{cache:true})
        const tabs = [{title:'全部',value:-1}].concat(data.items.map(it=>({
            title:it.name,
            value:it.id
        })))
        yield put({
            type:'updateState',
            payload:{
                tabs,
                tabsEnum:tabs.reduce((a,b)=>{
                    a[b.value] = b.title
                    return a
                },{})
            }
        })

    }
  },
})
