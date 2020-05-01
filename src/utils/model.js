import modelExtend from 'dva-model-extend'

export const pagination = {
  showTotal: total => `共 ${total} 条记录`,
  pageSizeOptions: ['10', '20', '30', '40'],
  showSizeChanger: true,
  showQuickJumper: true,
  current: 1,
  total: 0,
  pageSize: 20,
}

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination,
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    onSearch(state, { payload }) {
      const { pagination } = state
      return {
        ...state,
        pagination: {
          ...pagination,
          current: 1,
        },
        query: payload,
      }
    },
  },
})
