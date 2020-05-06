
import account from 'accounting'
import moment from 'moment'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { LinesEllipsis } from 'components'
import { FORMAT, DATE_RANGE } from '../../constants'
import Details from './Details'
import styles from '../index.less'

export const getSearchFields = function (is_pays = []) {

  const statusEnums = is_pays ? [
    { value: -1, name: '全部' },
    ...is_pays,
  ] : [{ value: -1, name: '全部' }]

  return [
    {
      type: 'enum',
      key: 'status',
      placeholder: '全部返利状态',
      enums: statusEnums,
    },
    {
      key: 'timeType',
      placeholder: '返佣开始时间',
      enums: [
        { value: 0, name: '返佣开始时间' },
        { value: 1, name: '返佣完成时间' }
      ],
    },
    {
      key: 'time',
      searchKeys: ['start_time', 'end_time'],
      placeholder: ['开始时间', '结束时间'],
      type: 'dateRange',
      inputProps: {
        ranges: DATE_RANGE,
        disabledDate: current => {
          return (
            current < moment().subtract(3, 'months') ||
            current > moment().endOf('day')
          )
        },
      },
      initialValue: [moment().subtract(30, 'days'), moment()],
    },
    {
      key: 'member_id',
      placeholder: '请输入用户名/ID搜索',
    },
    {
      key: 'order_no',
      placeholder: '请输入订单号搜索',
    },
  ]
}

export const getColumns = function (is_pays) {
  return [
    {
      title: '返佣开始时间',
      dataIndex: 'created_at',
      render: (text, row) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      )
    },
    {
      title: '用户名 / ID',
      dataIndex: 'nickname',
      render: (text, row) => (
        <span>{text}&nbsp;/&nbsp;{row.member_id}</span>
      )
    },
    {
      title: '商品',
      dataIndex: 'goods_name',
      render: (text) => {
        return (
          <div style={{ width: '300px' }}>
            <LinesEllipsis text={text} maxLine="1" />
          </div>
        )
      }
    },
    {
      title: '订单号',
      dataIndex: 'order_no',
      render: (text = '', row) => {
        return (
          $api.order.getOrderDetail.permission() ? <a onClick={() => { this.routeToOrder(row && row.order_id) }}>{text}</a>
            : text
        )
      }
    },
    {
      title: '返佣金额',
      dataIndex: 'money',
      render: (text = '', row) => {
        if (text < 0) {
          return (
            <div>
              <span>
                <MinusOutlined style={{ color: '#d9001b', fontSize: '12px' }} />
                &nbsp;{account.formatMoney(Math.abs(text), '￥')}
              </span>
            </div>
          );
        }
        return (
          <div>
            <span>
              <PlusOutlined style={{ color: '#70b603', fontSize: '12px' }} />
              &nbsp;{account.formatMoney(text, '￥')}
            </span>
          </div>
        );
      }
    },
    {
      title: '返佣状态',
      dataIndex: 'status',
      render: (text) => (
        <span>{is_pays[text]}</span>
      )
    },
    {
      title: '返佣完成时间',
      dataIndex: 'updated_at',
      render: (text = '', row) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text = '', row = '') => {
        return (
          $api.finance.getRebateDetail.permission() && (
            <a onClick={() => { this.onOpenDetailsModal(row) }}>查看明细</a>
          )
        )
      }
    },
  ];
}

export const detailColumns = [
  {
    title: '用户名 / ID',
    dataIndex: 'member_id',
    render: (text = '', row = {}) => {
      const { nickname = '' } = row
      return <div>{nickname}&nbsp;/&nbsp;{text}</div>
    }
  },
  {
    title: '返佣金额',
    dataIndex: 'money',
  },
  {
    title: '商品',
    dataIndex: 'goods_title',
    render: (text = '') => {
      return (
        <div style={{ width: '300px' }}>
          <LinesEllipsis text={text} maxLine="1" />
        </div>
      )
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status_text',
  },
]