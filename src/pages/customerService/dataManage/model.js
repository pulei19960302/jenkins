import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { ACCOUNT_QUERY } from '../constants'

export default modelExtend(model, pageModel, {
  namespace: 'dataManage',
  state: {
    conversationQuery: {
      person_type: ACCOUNT_QUERY.SERVICE,
    },
    // msg_list: [
    //   {
    //     id: 6,
    //     company_id: 1,
    //     conversation_key: "IM00002019120513225695385",
    //     person_type: 2,  //人员类型 1客服 2用户
    //     person_id: 1,   //人员id
    //     person_name: "小李子001", //人员名字
    //     person_head_picture: "aaa.jpg",  //人员头像
    //     redis_index: 1,  //消息下标
    //     status: 1,  //消息状态 0未读 1已读 
    //     msg_type: 2100,  //消息类型(参考消息wiki)
    //     content: "bbb",  //消息内容
    //     content_type: 1,  //消息内容类型
    //     is_delete: 0,  //是否删除 0未删除 1已删除
    //     created_at: "2019-12-05 14:27:47",  //创建时间(后台同学只需要使用这个)
    //     updated_at: "2019-12-05 14:54:21",
    //     last_time: "2019-12-05 14:27:47"
    //   }
    // ],
  },
  subscriptions: {},
  effects: {
    *getConversationList({ payload }, { call, put, select }) {
      const { pagination, conversationQuery } = yield select(
        _ => _.dataManage
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...conversationQuery, ...payload }
      const { pageSize: page_size, ...others } = params
      // const newParams = person_name ? { page_size, person_name, person_type, ...others } : { page_size, ...others }

      const { data } = yield call($api.dataManage.conversationList, { page_size, ...others })

      // data = {
      //   page: 1,
      //   page_size: 5,
      //   total: 2,
      //   list: [
      //     {
      //       id: 4,
      //       key: "IM002020021590309014",
      //       customer: "吹泡泡的小孩1(id:99907)",
      //       service: "-",
      //       sn_code: "112",
      //       sn_type: 1,
      //       created_at: "2020-02-15 11:18:46"
      //     },
      //     {
      //       id: 3,
      //       key: "IM002020021539271738",
      //       customer: "吹泡泡的小孩1(id:99906)",
      //       service: "-",
      //       sn_code: "112",
      //       sn_type: 1,
      //       created_at: "2020-02-15 11:18:06"
      //     },
      //     {
      //       id: 2,
      //       key: "IM00202002147856048",
      //       customer: "吹泡泡的小孩(id:99900)",
      //       service: "ivy",
      //       sn_code: "112",
      //       sn_type: 1,
      //       created_at: "2020-02-14 18:20:19"
      //     }
      //   ]
      // }

      yield put({
        type: 'querySuccess',
        payload: {
          list: data && data.list,
          pagination: {
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          }
        }
      })
    },
    *getConversationDetails({ payload }, { call, put, select }) {
      const { conversation_key = '' } = payload
      //'IM002020021766825912'
      const params = { conversation_key, page: -1, page_size: -1, keywords: '' }
      const { data = {} } = yield call($api.workorder.conversations, params)
      const { msg_list = [] } = data
      yield put({
        type: 'updateState',
        payload: {
          msg_list
        }
      })
    },
  },
})