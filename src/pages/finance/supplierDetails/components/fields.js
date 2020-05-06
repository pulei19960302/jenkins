import { LinesEllipsis } from 'components'
import account from 'accounting'
import moment from 'moment'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { DATE_RANGE, FORMAT } from '../../constants'

export const getSearchFields = function (types) {

  const typesList = types && Object.keys(types).reduce((obj, value) => (
    obj.concat([{ value, name: types[value] }])
  ), [])

  const typesEnum = typesList ? [
    { value: '', name: '全部交易类型' },
    ...typesList,
  ] : [
      { value: '', name: '全部交易类型' },
    ]

  return [
    {
      key: 'order_no',
      placeholder: '请输入订单号',
    },
    {
      key: 'time',
      searchKeys: ['update_start_time', 'update_end_time'],
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
    },
    {
      key: 'type',
      placeholder: '全部交易类型',
      type: 'enum',
      enums: typesEnum,
    },
  ]
}

export const getColumns = function (types) {

  return [
    {
      title: '商品',
      dataIndex: 'goods_name',
      width: '200',
      render: (text) => (
        <div style={{ width: '290px' }}>
          <LinesEllipsis text={text} maxLine="1" />
        </div>
      ),
    },
    {
      title: '商品数量',
      dataIndex: 'goods_num',
    },
    {
      title: '交易单号',
      dataIndex: 'order_no',
      render: (text, row) => (
        <a onClick={() => { this.handleRouteToOrder(row) }}>{text}</a>
      )
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      render: (text) => (
        <span>{types && types[text]}</span>
      ),
    },
    {
      title: '结算金额',
      dataIndex: 'amount',
      render: (text) => {
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
      },
    },
    // {
    //   title: '交易金额',
    //   dataIndex: 'goods_price',
    //   render: (text) => (
    //     <span>{account.formatMoney(text, '￥')}</span>
    //   ),
    // },
    {
      title: '商品单价',
      dataIndex: 'goods_purchase',
      render: (text) => (
        <span>{account.formatMoney(text, '￥')}</span>
      ),
    },
    {
      title: '交易时间',
      dataIndex: 'updated_at',
      render: (text) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      ),
    },
  ];
}