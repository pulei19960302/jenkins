import { Divider } from 'antd'
import { FSwitch } from 'components'
import { AGREEMENT_STATUS, hasBtn } from '../../constants'

export const getColumns = function () {
  return [
    {
      title: '协议ID',
      dataIndex: 'id',
    },
    {
      title: '协议名称',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, row) => {
        const { id = '' } = row
        return <FSwitch
          values={[AGREEMENT_STATUS.ENABLED, AGREEMENT_STATUS.DISABLED]}
          texts={['启用', '禁用']}
          value={text}
          className='mr10'
          onChange={(checked) => { this.handleSwitchStatus(checked, id) }}
          disabled={!hasBtn('switchAgreeStatus')}
        />
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        const { id = '' } = row
        return (
          <div>
            {
              hasBtn('updateAgreement') && (
                <span>
                  <a onClick={() => { this.handleEdit(id) }}>编辑</a>
                  <Divider type="vertical" />
                </span>
              )
            }
            {
              hasBtn('deleteAgreement') && (
                <a onClick={() => { this.handleDelete(id) }}>删除</a>
              )
            }
          </div>
        )
      }
    },
  ]
}