import moment from 'moment'
import { Badge, Divider } from 'antd'
import { COUPON_TYPE, COUPON_STATUS, FORMAT, hasBtn } from '../../constants'
import { TableDropDown } from 'components'

export const searchFields = [
  {
    type: 'enum',
    key: 'type',
    placeholder: '请选择类型',
    enums: [
      { value: -1, name: '全部' },
      { value: 1, name: '现金券' },
      { value: 2, name: '满减' },
    ],
  },
  {
    type: 'enum',
    key: 'status',
    placeholder: '请选择状态',
    enums: [
      { value: -1, name: '全部' },
      { value: 1, name: '未发布' },
      { value: 2, name: '未过期' },
      { value: 3, name: '已过期' },
      { value: 4, name: '已作废' },
    ],
  },
  {
    key: 'key_word',
    placeholder: '请输入优惠ID或名称',
  },
]

export const typeFields = [
  {
    title: '全部类型',
    value: '',
    key: 'total',
  },
  {
    title: '现金券',
    value: COUPON_TYPE.CASH,
    key: 'cash',
  },
  {
    title: '满减券',
    value: COUPON_TYPE.MONEY_OFF,
    key: 'money_off',
  },
  {
    title: '折扣券',
    value: COUPON_TYPE.DISCOUNT,
    key: 'discount',
  },
]

export const statusFields = [
  {
    title: '未发布',
    value: COUPON_STATUS.UNPUBLISHED,
    key: 'unpublished',
  },
  {
    title: '未过期',
    value: COUPON_STATUS.UNEXPIRED,
    key: 'unexpired',
  },
  {
    title: '已过期',
    value: COUPON_STATUS.EXPIRED,
    key: 'expired',
  },
  {
    title: '已作废',
    value: COUPON_STATUS.CANCELED,
    key: 'canceled',
  },
]

const getStatus = function (status, row, callback) {
  //operationItems: for operation's component: TableDropDown's items 
  let color, text, operationItems
  switch (status) {
    case COUPON_STATUS.UNPUBLISHED:
      color = '#52C41A';
      text = '未发布';
      operationItems = [
        {
          label: '发布',
          value: 'publish',
        },
        {
          label: '编辑',
          value: 'edit',
        },
        {
          label: '复制',
          value: 'copy',
        },
        {
          label: '删除',
          value: 'delete'
        },
      ]
      break;
    case COUPON_STATUS.UNEXPIRED:
      color = '#1890FF';
      text = '未过期';
      operationItems = [
        {
          label: '复制',
          value: 'copy',
        },
        {
          label: '作废',
          value: 'invalid',
        },
        {
          label: '派发',
          value: 'dispatch',
        },
      ]
      break;
    case COUPON_STATUS.EXPIRED:
      color = '#FF9E2D';
      text = '已过期';
      operationItems = [
        {
          label: '复制',
          value: 'copy',
        },
      ];

      break;
    case COUPON_STATUS.CANCELED:
      color = 'rgba(0,0,0,0.25)';
      text = '已作废';
      operationItems = [
        {
          label: '复制',
          value: 'copy',
        },
      ];
      break;
    default:
      break;
  }

  return {
    color,
    text,
    operationItems,
  }
}

const getTypeFields = () => {
  return typeFields.reduce((a, b) => {
    b.value && (a[b.value] = b.title)
    return a
  }, {})
}

export const getColumns = function () {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '优惠券名称',
      dataIndex: 'name',
      width: 250,
      render: (text, row) => {
        return (
          hasBtn('getCouponByIds') ?
            (<a onClick={() => { this.tableMoreClick('view', row) }}>{text}</a>)
            : (<span>{text}</span>)
        )
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 120,
      render: (text) => <span>{getTypeFields()[text]}</span>,
    },
    {
      title: '有效期',
      dataIndex: 'start_at',
      width: 300,
      render: (text = '', record = {}) => {
        const { start_at = '', end_at = '', days = '' } = record
        if (record.be_over_type === 1) {
          return (
            <span>
              {start_at && moment(start_at).format(FORMAT)}
                &nbsp;至&nbsp;
              {end_at && moment(end_at).format(FORMAT)}
            </span>
          )
        }
        else {
          return (
            <span>
              领取后&nbsp;{days}&nbsp;天&nbsp;内有效
            </span>
          )
        }
      }
    },
    {
      title: '剩余/总计',
      dataIndex: 'num',
      width: 200,
      render: (text, record) => <span>{text}/{text + record.receive_num}</span>,
    },
    {
      title: '使用/领取',
      dataIndex: 'receive_num',
      width: 200,
      render: (text, record) => <span>{record.receive_use_num}/{text}</span>,
    },
    {
      title: '优惠券状态',
      dataIndex: 'status',
      width: 120,
      render(status) {
        return (
          <Badge
            color={getStatus(status).color}
            text={getStatus(status).text}
          />
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 180,
      render: (text, row) => {
        switch (row.status) {
          case COUPON_STATUS.UNPUBLISHED:
            return (
              <div>
                {
                  hasBtn('publishCoupon') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('publish', row)
                        }}
                      >
                        发布
                    </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                {
                  hasBtn('editCoupon') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('edit', row)
                        }}
                      >
                        编辑
                    </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                <TableDropDown items={[
                  {
                    label: '复制',
                    value: 'copy',
                    permission: hasBtn('addCoupon'),
                  },
                  {
                    label: '删除',
                    value: 'delete',
                    permission: hasBtn('deleteCoupon'),
                  }
                ].filter(el => el.permission)} row={row} itemClick={this.tableMoreClick} />
              </div>
            )
          case COUPON_STATUS.UNEXPIRED:
            return (
              <div>
                {
                  hasBtn('couponUseDetails') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('details', row)
                        }}
                      >
                        码库
                      </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                {
                  hasBtn('addCoupon') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('copy', row)
                        }}
                      >
                        复制
                      </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                {
                  hasBtn('invalidCoupon') && (
                    <a
                      onClick={() => {
                        this.tableMoreClick('invalid', row)
                      }}
                    >
                      作废
                    </a>
                  )
                }
              </div>
            )
          case COUPON_STATUS.EXPIRED:
            return (
              <div>
                {
                  hasBtn('couponUseDetails') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('details', row)
                        }}
                      >
                        码库
                      </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                {
                  hasBtn('addCoupon') && (
                    <a
                      onClick={() => {
                        this.tableMoreClick('copy', row)
                      }}
                    >
                      复制
                    </a>
                  )
                }
              </div>
            )
          case COUPON_STATUS.CANCELED:
            return (
              <div>
                {
                  hasBtn('couponUseDetails') && (
                    <span>
                      <a
                        onClick={() => {
                          this.tableMoreClick('details', row)
                        }}
                      >
                        码库
                    </a>
                      <Divider type="vertical" />
                    </span>
                  )
                }
                {
                  hasBtn('addCoupon') && (
                    <a
                      onClick={() => {
                        this.tableMoreClick('copy', row)
                      }}
                    >
                      复制
                    </a>
                  )
                }
              </div>
            )
        }
      }
    }
  ]
}

export const detailsSearchFields = [
  {
    key: 'id',
    placeholder: '请输入优惠码',
  },
  {
    key: 'keyword',
    placeholder: '请输入优惠昵称或账号',
  },
]

export const getDetailsColumns = function () {
  return [
    {
      title: '优惠码',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 120,
    },
    {
      title: '账号',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: '领取时间',
      dataIndex: 'created_at',
      width: 120,
    },
    {
      title: '使用时间',
      dataIndex: 'use_time',
      width: 120,
    },
  ]
}
