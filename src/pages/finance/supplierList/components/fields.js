
import account from 'accounting'
import moment from 'moment'
import { Divider, Popover } from 'antd';
import { LinesEllipsis } from 'components'
import { FORMAT, SUPPLIER_STATUS, DATE_RANGE, hasBtn } from '../../constants'
import styles from '../index.less'

export const getSearchFields = function (status) {
  const statusFields = status && Object.keys(status).reduce(
    (total, value) => (total.concat([{ value, name: status[value] }])),
    [])

  const statusEnum = statusFields ? [
    { value: '', name: '全部' },
    ...statusFields,
  ] : [{ value: '', name: '全部' }]

  return [
    {
      key: 'supplier',
      placeholder: '供应商名称/ID',
    },
    {
      key: 'status',
      placeholder: '全部',
      type: 'enum',
      enums: statusEnum,
    },
    {
      key: 'time',
      searchKeys: ['update_start_time', 'update_end_time'],
      placeholder: ['更新开始时间', '更新结束时间'],
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
  ]
}

export const getColumns = function (status) {
  return [
    {
      title: '交易单号',
      dataIndex: 'id',
    },
    {
      title: '供应商名称 / ID',
      dataIndex: 'supplier_name',
      render: (text, row) => (
        <span>{text}&nbsp;/&nbsp;{row.supplier_id}</span>
      ),
    },
    {
      title: '待结订单',
      dataIndex: 'order_num',
      render: (text) => (
        <span>{account.formatNumber(text)}</span>
      ),
    },
    {
      title: () => (
        <span className={styles.title}>
          待结总额
        </span>),
      dataIndex: 'money',
      money: true,
    },
    {
      title: () => (
        <span className={styles.title}>
          已结金额
        </span>),
      dataIndex: 'paid_amount',
      money: true,
    },
    {
      title: '是否结清',
      dataIndex: 'status',
      render: (text) => (
        <span>
          {text === SUPPLIER_STATUS.CLOSED ? '是' : '否'}
        </span>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'admin_name',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      render: (text) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      ),
    },
    {
      title: '备注',
      width: 120,
      dataIndex: 'remark',
      render: (text) => {
        return (
          <div style={{ width: '120px' }}>
            <LinesEllipsis text={text} maxLine="1" />
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        return (
          <div>
            {
              hasBtn('suppilerDetails') && (
                <span>
                  <a onClick={() => { this.handleViewDetails(row) }}>货款明细</a>
                  <Divider type="vertical" />
                </span>
              )
            }
            {
              hasBtn('settle') && (
                <a onClick={() => { this.onOpenSettleModal(row) }} >结算</a>
              )
            }
          </div>
        )
      },
    },
  ]
}