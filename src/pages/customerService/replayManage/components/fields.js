import { Divider } from 'antd'
import { MANAGE_TABS } from '../../constants'

export const tabsFields = [
  {
    title: '客户自助服务',
    value: MANAGE_TABS.SELF_SERVICE,
    key: 'selfService',
  },
  // {
  // 	title: '客户自动回复',
  // 	value: MANAGE_TABS.AUTO_RESPNSE,
  // 	key: 'autoResponse',
  // },
]

export const getResponseColumns = function () {
  return [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '应答名称',
      dataIndex: 'name',
    },
    {
      title: '应答类型',
      dataIndex: 'type',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        return (
          <div>
            <a onClick={() => { this.handleEditRespone(row) }}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => { this.handleDeleteResponse(row) }}>删除</a>
          </div>
        )
      }
    },
  ]
} 