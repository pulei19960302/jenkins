
import { Tooltip, Popover } from 'antd'
import moment from 'moment'
import { WORK_STATUS, ORDER_STATUS, hasBtn } from '../../constants'

const relationType = [
  {
    value: ORDER_STATUS.ORDER,
    title: '订单'
  },
  {
    value: ORDER_STATUS.AFTERSALE,
    title: '售后'
  }
]

const typesArray = (types) => {
  return types.reduce((total, current) => {
    current.value && (total[current.value] = current.title)
    return total
  }, {})
}

export const searchFields = [
  {
    key: 'worksheet_code',
    placeholder: '请输入工单号',
  },
  {
    key: 'time',
    searchKeys: ['start_time', 'end_time'],
    placeholder: ['开始时间', '结束时间'],
    type: 'dateRange',
    initialValue: [moment().subtract(2, 'days'), moment()],
  },
  {
    key: 'customer_member_id',
    placeholder: '请输入客户ID',
  },
  {
    key: 'create_member_phone',
    placeholder: '请输入创建人/客服账号',
  },
  {
    key: 'order_sn',
    placeholder: '订单号',
  },
  {
    key: 'after_order_sn',
    placeholder: '售后服务单号'
  }
]

export const tabsFields = [
  {
    title: '全部工单',
    value: '-1',
    key: 'total',
  },
  {
    title: '处理中',
    value: WORK_STATUS.PROGRESS,
    key: 'progress',
  },
  {
    title: '已关闭',
    value: WORK_STATUS.CLOSED,
    key: 'closed',
  }
]

export const getColumns = function () {
  return [
    {
      title: '工单号',
      dataIndex: 'code',
    },
    {
      title: '客户账号',
      dataIndex: 'customer_member_name',
      render: (text, row) => {
        return <span>{text}&nbsp;({row.customer_member_id})</span>
      }
    },
    {
      title: '工单类型',
      dataIndex: 'worksheet_type_name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '创建人',
      dataIndex: 'create_member_phone',
    },
    {
      title: '关联单据数量',
      dataIndex: 'relation_num',
      render: (text, row) => {
        const { relation = [] } = row
        const titles = relation && relation.map((data) => {
          const { relation_sn_type, relation_sn } = data
          const title = typesArray(relationType)[relation_sn_type]

          if (relation_sn_type === ORDER_STATUS.AFTERSALE) {
            return (
              <div>【{title}】&nbsp;
                <a onClick={() => { this.onViewAfterSale(relation_sn, row.customer_member_id) }}>{relation_sn}</a>
              </div>
            )
          }

          return (
            <div>【{title}】&nbsp;
              <a onClick={() => { this.onViewOrderInfo(relation_sn, row.customer_member_id) }}>{relation_sn}</a>
            </div>
          )

        })

        return (
          <Tooltip title={titles} placement="bottomLeft" overlayStyle={{ backgroundColor: '#fff', zIndex: '100' }}>
            <span style={{ cursor: 'pointer', color: '#12C2C2' }}>{text}</span>
          </Tooltip>
        )
      }
    },
    {
      title: '工单状态',
      dataIndex: 'status',
      render: (text, row) => {
        return <span>{typesArray(tabsFields)[text]}</span>
      }
    },
    {
      title: '处理人',
      dataIndex: 'service_member_phone',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (text, row) => {
        return (
          hasBtn('details') && (
            <a onClick={() => { this.onViewDetail(row) }}>查看详情</a>
          )
        )
      }
    }
  ]
}
