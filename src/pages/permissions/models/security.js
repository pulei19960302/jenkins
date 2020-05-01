import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, arrayToTree } from 'utils'
import { model } from 'utils/model'
import lodash from 'lodash'

export default modelExtend(model, {
  namespace: 'security',
  state: {
    selectedRole: '',
    roles: [],
    details: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/permissions/security', pathname)) {
          dispatch({ type: 'getPermissionTree' }).then(_ => {
            dispatch({ type: 'getRolesList' })
          })
        }
      })
    },
  },
  effects: {
    *getRolesList({ payload }, { call, put, select }) {
      const { data } = yield call($api.permissions.getRolesList)
      const { selectedRole } = yield select(_ => _.security)
      const selected = data.every(el => (el.id === selectedRole))
      const newSelectedRole = selected ? selectedRole : data[0] && data[0].id
      yield put({
        type: 'updateState',
        payload: {
          roles: data,
          selectedRole: newSelectedRole
        }
      })

      yield put({
        type: 'setPermissionTree',
        payload: {
          id: newSelectedRole
        }
      })
    },
    *updateRolesList({ payload }, { call, put, select }) {
      const { callback } = payload || {}
      const { data } = yield call($api.permissions.getRolesList)
      yield put({
        type: 'updateState',
        payload: {
          roles: data,
        }
      })
      callback && callback()
    },
    *createRole({ payload }, { call, put, select }) {
      const { name } = payload
      yield call($api.permissions.createRole, { name })
      yield put({ type: 'updateRolesList' })
    },
    *deleteRole({ payload }, { call, put, select }) {
      const { role_id } = payload
      yield call($api.permissions.deleteRole, { role_ids: [role_id] })
      yield put({ type: 'getRolesList' })
    },
    *updateRole({ payload }, { call, put, select }) {
      const { id, role_name, callback } = payload
      yield call($api.permissions.updateRole, { data: [{ id, role_name }] })
      yield put({ type: 'updateRolesList', payload: { callback } })
    },
    *updateSelectedRole({ payload }, { call, put, select }) {
      const { id = '' } = payload
      yield put({
        type: 'updateState',
        payload: {
          selectedRole: id
        }
      })
      yield put({
        type: 'setPermissionTree',
        payload: {
          id
        }
      })
    },
    *getPermissionTree({ payload }, { call, put, select }) {
      const { data = [] } = yield call($api.permissions.getPermissionsList)
      const menuTree = data && arrayToTree(data, 'id', 'parent_id')
      yield put({
        type: 'updateState',
        payload: {
          details: menuTree,
        }
      })
    },
    *setPermissionTree({ payload }, { call, put, select }) {
      const { id = '' } = payload
      const { data = {} } = yield call($api.permissions.getRolePermissions, { role_id: id })
      const { role_ids = [] } = data
      const { details = [] } = yield select(_ => _.security)
      const newDetails = lodash.cloneDeep(details)
      const setCheckedValue = (items = [], checkedIds = []) => {
        if (!items || !items.length) return null

        items.forEach((item) => {
          const { id = '', children = '' } = item
          item.checked = checkedIds.includes(id) ? true : false
          children && setCheckedValue(children, checkedIds)
        })
      }
      setCheckedValue(newDetails, role_ids)
      yield put({
        type: 'updateState',
        payload: {
          details: newDetails,
        }
      })
    },
    *updatePermissionTree({ payload }, { call, put, select }) {
      const { details = [] } = yield select(_ => _.security)
      const newDetails = lodash.cloneDeep(details)
      const { item, checked } = payload
      const { id, parent_id } = item
      const itemChecked = (el, checked) => {
        let flag = checked
        el.children.forEach(child => {
          if (child.checked) {
            flag = true
          }
        })
        return flag
      }

      const getChildrenChecked = (items, id, checked) => {
        items && items.forEach(el => {
          if (el.id === id || el.parent_id === id) {
            el.checked = checked
            if (el.children) {
              getChildrenChecked(el.children, el.id, checked)
            }
          } else if (el.children) {
            getChildrenChecked(el.children, id, checked)
          }
        })
      }

      const getParentChecked = (pid, items) => {
        items && items.forEach(el => {
          if (el.id === pid) {
            el.checked = itemChecked(el, el.checked)
            if (el.parent_id) {
              getParentChecked(el.parent_id, newDetails)
            }
          } else if (el.children) {
            getParentChecked(pid, el.children)
          }
        })
      }

      getChildrenChecked(newDetails, id, checked)
      getParentChecked(parent_id, newDetails)

      yield put({
        type: 'updateState',
        payload: {
          details: newDetails
        }
      })
    }
  }
})