import { Badge } from 'antd'
  
//优惠券类型
const COUPON_TYPE = {
    1:'现金券',
    2:'满减券',
    3:"折扣券"
}
const COUPON_STATUS = {
    1:['未发布','#52C41A'],
    2:['未过期','#1890FF'],
    3:['已过期','#FF9E2D'],
    4:['已作废','rgba(0,0,0,0.25)']
}

export const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
        title: '优惠券名称',
        dataIndex: 'name',
    },
    {
        title:'优惠券类型',
        dataIndex: 'type',
        render: (text) => <span>{COUPON_TYPE[text]}</span>,
    },
    {
        title:'开始时间',
        dataIndex:'start_at'
    },
    {
        title:'结束时间',
        dataIndex:'end_at'
    },
    {
        title:'状态',
        dataIndex:'status',
        render(status) {
            return (
                COUPON_STATUS[status]?
              <Badge
                color={COUPON_STATUS[status][1]}
                text={COUPON_STATUS[status][0]}
              />:''
            )
          },
    },
    {
        title:'限制金额',
        dataIndex:'max',
    },
    {
        title:'减免金额',
        dataIndex:'waiver_amount'
    }
]

export const searchFields = [
    {
        key: 'key_word',
        placeholder: '优惠券编号/名称',
    }
]