import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

export default modelExtend(model, {
  namespace: 'workOrderDetail',
  state: {
    details: {},
    relations: [],
    conversations: {
    }
  },
  subscriptions: {},
  effects: {
    *getDetails({ payload }, { put, call, select }) {
      const { worksheet_code } = payload
      const { data } = yield call($api.workorder.details, { worksheet_code })
      yield put({
        type: 'updateState',
        payload: {
          details: data
        }
      })
    },
    *getConversations({ payload }, { put, call, select }) {
      const { conversations } = yield select(_ => _.workOrderDetail)
      const { msg_list: oldMsgList = [] } = conversations

      const { conversation_key, page = 1, page_size = 1, keywords = '' } = payload
      const params = { conversation_key, keywords, page_size, page }
      const { data } = yield call($api.workorder.conversations, params)
      const { msg_list: newMsgList = [], total } = data
      const newConversations = {
        msg_list: page === 1 ? newMsgList : [...oldMsgList, ...newMsgList,],
        total,
        loading: false,
      }

      yield put({
        type: 'updateState',
        payload: {
          conversations: newConversations,
        }
      })
    },
    *getRelations({ payload }, { put, call, select }) {
      const { worksheet_code } = payload
      const { data } = yield call($api.workorder.getRelations, { worksheet_code })
      yield put({
        type: 'updateState',
        payload: {
          relations: data
        }
      })
    }
  }
})