import moment from 'moment'
import { LinesEllipsis } from 'components'
import { DATA_TABS, FORMAT, ACCOUNT_QUERY, SOURCE_TYPE } from '../../constants'

export const sourceTypes = {
  [SOURCE_TYPE.ORDER]: '订单',
  [SOURCE_TYPE.AFTERSALE]: '售后',
  [SOURCE_TYPE.PRODUCT]: '商品',
}

export const tabsFields = [
  {
    title: '会话查询',
    value: DATA_TABS.CONVERSATION,
    key: 'conversation',
  },
  // {
  //   title: '服务数据',
  //   value: DATA_TABS.SERVICE,
  //   key: 'service',
  // },
]

export const conversationSearchFields = [
  {
    key: 'person_type',
    placeholder: '客服账号',
    enums: [
      { value: ACCOUNT_QUERY.SERVICE, name: '客服账号' },
      { value: ACCOUNT_QUERY.CLIENT, name: '客户账号' }
    ],
    inputProps: {
      defaultValue: ACCOUNT_QUERY.SERVICE,
    },
  },
  {
    key: 'person_name',
    placeholder: '请输入账号查询',
  },
  {
    key: 'person_id',
    placeholder: '输入客户ID查询',
  },
  {
    key: 'key',
    placeholder: '输入会话ID查询',
  },
  {
    key: 'time',
    searchKeys: ['start_date', 'end_date'],
    placeholder: ['开始时间', '结束时间'],
    type: 'dateRange',
  },
  {
    key: 'sn_code',
    placeholder: '输入订单号查询',
  },
]

export const getConversationColumns = function () {
  return [
    {
      title: '会话ID',
      dataIndex: 'key',
      render: (text = '') => (
        <div style={{ width: '190px' }}>
          <LinesEllipsis text={text.toString()} maxLine="1" />
        </div>
      ),
    },
    {
      title: '客户账号',
      dataIndex: 'customer',
      render: (text = '') => (
        <div style={{ width: '250px' }}>
          <LinesEllipsis text={text} maxLine="1" />
        </div>
      ),
    },
    {
      title: '客服账号',
      dataIndex: 'service',
      render: (text = '') => (
        <div style={{ width: '190px' }}>
          <LinesEllipsis text={text} maxLine="1" />
        </div>
      ),
    },
    {
      title: '订单ID',
      dataIndex: 'sn_code',
      render: (text = '') => (
        <div style={{ width: '11%' }}>
          <LinesEllipsis text={text} maxLine="1" />
        </div>
      ),
    },
    {
      title: '咨询来源',
      dataIndex: 'sn_type',
      width: '11%',
      render: (text) => {
        return <span>{sourceTypes[text]}</span>
      },
    },
    {
      title: '咨询时间',
      dataIndex: 'created_at',
      render: (text) => (
        <span>{text && moment(text).format(FORMAT)}</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => (
        <a onClick={() => { this.handleViewDetails(row) }}>查看详情</a>
      ),
    },
  ]
}