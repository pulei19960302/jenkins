import moment from 'moment'
import { Divider } from 'antd'
import { hasBtn } from '../../constants'
const format = 'YYYY-MM-DD HH:mm:ss'

export const searchFields = [
  {
    key: 'type_name',
    placeholder: '输入分类名称查询',
  },
  {
    key: 'time',
    searchKeys: ['start_date', 'end_date'],
    placeholder: ['开始时间', '结束时间'],
    type: 'dateRange',
  },
  {
    key: 'member_name',
    placeholder: '创建人',
  }
]

export const getColumns = function () {
  return [
    {
      title: '类型名称',
      dataIndex: 'type_name',
    },
    {
      title: '修改人',
      dataIndex: 'operation_member_name',
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
      render: (text) => {
        return <span>{moment(text).format(format)}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (text, row) => {
        return (
          <div>
            {
              hasBtn('addEditTypes') && (
                <a onClick={() => { this.toggleAddEditModal({}, row && row.id, row && row.type_name) }}>编辑</a>
              )
            }
            <Divider type="vertical" />
            {
              hasBtn('deleteTypes') && (
                <a onClick={() => { this.onDeleteTypes([row && row.id]) }}>删除</a>
              )
            }
          </div>
        )
      }
    }
  ]
}