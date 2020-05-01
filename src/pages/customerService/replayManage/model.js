import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

export default modelExtend(model, {
	namespace: 'replyManage',
	state: {
		serviceSwitch: false,
		title: '不能超过20个字符',
		responseList: [
			{
				id: 1,
				name: 'title1',
				type: 'type1',
			},
			{
				id: 2,
				name: 'title2',
				type: 'type2',
			},
			{
				id: 3,
				name: 'title3',
				type: 'type3',
			},
		],
		responseDetails: {
			
		},
	},
	subscriptions: {},
	effects: {
		*getServiceDatas({ payload }, { put, call, select }){
			//向后台发送 api 请求 获取 标题， 以及， 应答 列表
		},
		*toggleServiceSwitch({ payload }, { put, call, select }){
			const { serviceSwitch = false } = payload
			// 向后台发送 api 请求 如果成功 则更新 state
			yield put({
				type: 'updateState',
				payload: { serviceSwitch }
			})
		},
		*updateTitle({ payload }, { put, call, select }){
			const { title = '' } = payload
			//向后台发送请求 更新title 成功后，再次刷新数据，应该会再调一次 getServiceDatas
			yield put({
				type: 'updateState',
				payload: { title }
			})
		},
	},
})