import moment from 'moment'
import { Divider, Input } from 'antd'
import { FSwitch, LinesEllipsis } from 'components'
import { EXPRESS_FIELDS as fields, EXPRESS_STATUS, hasBtn } from '../../../../constants'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const getSearchFields = function () {
  const statusEnum = fields && Object.keys(fields).reduce((obj, value) => (
    obj.concat([{ value, name: fields[value] }])
  ), [])

  return [
    {
      key: 'name',
      placeholder: '请输入物流公司名称搜索',
    },
    {
      key: 'phone',
      placeholder: '请输入联系方式搜索',
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

export const getColumns = function (editing, phoneValue) {
  return [
    {
      title: '物流公司',
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
              style={{ /* width: '200px', */ /* marginLeft: '-12px',height:'28px' */ }}
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
      title: '物流代码',
      dataIndex: 'express_code',
      width: 200,
      render: (text, row) => {
        const { id: editingId = '' } = editing
        const { id = '' } = row
        const name = 'express_code'

        if (editingId === id) {
          return (
            <Input
              maxLength={32}
              defaultValue={text}
              style={{ /* width: '200px', */ /* marginLeft: '-12px',height:'28px' */ }}
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
      title: '联系方式',
      dataIndex: 'phone',
      width: 200,
      render: (text, row) => {
        const { id: editingId = '' } = editing
        const { id = '' } = row
        const name = 'phone'

        if (editingId === id) {
          return (
            <Input
              type="phone"
              maxLength={20}
              defaultValue={text}
              value={phoneValue}
              style={{ /* width: '150px', *//* marginLeft: '-12px',height:'28px'  */ }}
              onChange={(event) => {
                const { target = {} } = event
                const { value = '' } = target || {}
                this.handleFormatPhone(value)
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
      title: '状态',
      dataIndex: 'status',
      render: (text, row) => {
        const { id = '' } = row
        const ids = [id]
        return (
          <FSwitch
            values={[EXPRESS_STATUS.ENABLED, EXPRESS_STATUS.DISABLED]}
            texts={['启用', '禁用']}
            value={text}
            onChange={(e) => { this.handleSwitchStatus(e, ids) }}
            disabled={!hasBtn('switchExpressStatus')}
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
      // width: 240,
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

        if (status === EXPRESS_STATUS.ENABLED) {
          return null
        }
        if (id === editingId) {
          return (
            <div>
              <a onClick={() => { this.handleUpdateExpress() }}>确定</a>
              <Divider type="vertical" />
              <a onClick={() => { this.handleEditExpress() }}>取消</a>
            </div>
          )
        }

        return (
          <div>
            {
              hasBtn('updateExpress') && (
                <span>
                  <a onClick={() => { this.handleEditExpress(row) }}>编辑</a>
                  <Divider type="vertical" />
                </span>
              )
            } 
            {
              hasBtn('deleteExpress') && (
                <a onClick={() => { this.handleDeleteExpress([id]) }}>删除</a>
              )
            }
          </div>
        )
      },
    },
  ]
}