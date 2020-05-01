import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { FORMAT } from '../constants'

export default modelExtend(model, pageModel, { 
	namespace: 'dispatchManage',
	state: {
		list: [
			{
				id: 1,
				name: 'name',
				num: 1,
				account: 'account',
				status: 2,
				service_member_id: 1,
			}
		],
	},
	subscriptions: {},
	effects: {
		*getList({ payload }, { put, call, select }){
			const { pagination, query } = yield select(
				_ => _.dispatchManage
			)
			const { pageSize, current: page } = pagination
			const params = { pageSize, page, ...query, ...payload }
			const { pageSize: page_size, ...others } = params
			// wait back-end api.
			// const { data } = yield call($api.finance.afterSaleList, { page_size, ...others })

			// yield put({
			// 	type: 'querySuccess',
			// 	payload: {
			// 	list: data && data.data,
			// 	pagination: {
			// 		total: data && data.total,
			// 			current: params.page,
			// 			pageSize: params.pageSize,
			// 		}
			// 	}
			// })
		},
	},
})