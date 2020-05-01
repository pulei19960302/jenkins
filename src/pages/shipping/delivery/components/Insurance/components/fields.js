import moment from 'moment'
import account from 'accounting'
import { Divider, Input, InputNumber } from 'antd'
import { FSwitch, LinesEllipsis } from 'components'
import { cutOutDecimals } from 'utils'
import { INSURANCE_FIELDS as fields, INSURANCE_STATUS, hasBtn } from '../../../../constants'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const getSearchFields = function () {
  const statusEnum = fields && Object.keys(fields).reduce((obj, value) => (
    obj.concat([{ value, name: fields[value] }])
  ), [])

  return [
    {
      key: 'name',
      placeholder: '请输入模板名称',
    },
    {
      key: 'status',
      placeholder: '全部状态',
      type: 'enum',
      enums: [
        { value: '', name: '全部状态' },
        ...(statusEnum || {}),
      ],
    },
  ]
}

export const getColumns = function (editing) {
  return [
    {
      title: '模板名称',
      dataIndex: 'name',
      width: 200,
      render: (text, row) => {
        const { id: editingId = '' } = editing
        const { id = '' } = row
        const name = 'name'

        if (editingId === id) {
          return (
            <Input
              maxLength={30}
              defaultValue={text}
              onChange={(event) => {
                const { target = {} } = event
                const { value = '' } = target || {}
                this.handleUpdateFields({ name, value })
              }}
            />)
        }
        return (
          <div style={{ width: '200px' }}>
            <LinesEllipsis text={text} maxLine="1" />
          </div>
        )
      },
    },
    {
      title: '运费险',
      dataIndex: 'money',
      width: 150,
      render: (text, row) => {
        const { id: editingId = '' } = editing
        const { id = '' } = row
        const name = 'money'

        if (editingId === id) {
          return (
            <InputNumber
              maxLength={20}
              defaultValue={text}
              onChange={(value = '') => {
                this.handleUpdateFields({ name, value })
              }}
              formatter={value => cutOutDecimals(value, 2)}
            />)
        }
        return (
          <span>{account.formatMoney(text, '￥')}</span>
        )
      },
    },
    {
      title: '赔付金额',
      dataIndex: 'compensate',
      width: 150,
      render: (text, row) => {
        const { id: editingId = '' } = editing
        const { id = '' } = row
        const name = 'compensate'

        if (editingId === id) {
          return (
            <InputNumber
              maxLength={20}
              defaultValue={text}
              onChange={(value = '') => {
                this.handleUpdateFields({ name, value })
              }}
              formatter={value => cutOutDecimals(value, 2)}
            />)
        }
        return (
          <span>{account.formatMoney(text, '￥')}</span>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, row) => {
        const { id = '' } = row
        const ids = [id]
        return (
          <FSwitch
            values={[INSURANCE_STATUS.ENABLED, INSURANCE_STATUS.DISABLED]}
            texts={['启用', '禁用']}
            value={text}
            onChange={(e) => { this.handleSwitchStatus(e, ids) }}
            disabled={!hasBtn('switchInsuranceStatus')}
          />)
      },
    },
    {
      title: '修改人',
      dataIndex: 'update_username',
      render: (text, row) => {
        const { create_username = '' } = row
        return (
          <span>
            {text || create_username}
          </span>
        )
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
      render: (text, row) => {
        const { created_at = '' } = row
        return (
          <span>
            {text ? moment(text).format(FORMAT) :
              (created_at && moment(created_at).format(FORMAT))}
          </span>)
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        const { id = '', status = '' } = row
        const { id: editingId = '' } = editing

        if (status === INSURANCE_STATUS.ENABLED) {
          return null
        }
        if (id === editingId) {
          return (
            <div>
              <a onClick={() => { this.handleUpdateInsurance() }}>确定</a>
              <Divider type="vertical" />
              <a onClick={() => { this.handleEditInsurance() }}>取消</a>
            </div>
          )
        }

        return (
          <div>
            {
              hasBtn('updateInsurance') && (
                <span>
                  <a onClick={() => { this.handleEditInsurance(row) }}>编辑</a>
                  <Divider type="vertical" />
                </span>
              )
            }
            {
              hasBtn('deleteInsurance') && (
                <a onClick={() => { this.handleDeleteInsurance([id]) }}>删除</a>
              )
            }
          </div>
        )
      },
    },
  ]
}