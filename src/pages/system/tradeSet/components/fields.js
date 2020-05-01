import { Input, InputNumber, Select } from 'antd'
import { ORDER_TYPE_OPTIONS as orderOptions, ORDER_TYPES as orderTypes } from '../../constants'
import { cutOutDecimals } from 'utils'

const { Option } = Select
export const orderFields = function () {
  return [
    {
      title: '订单类型',
      width: 200,
      dataIndex: 'orderType',
      render: (text, row) => {
        return (
          <Select
            defaultValue={text || orderTypes.ALL}
            onChange={(value) => { this.handleUpdateOrderList('orderType', value, row) }}>
            {
              orderOptions && orderOptions.map((el) => (
                <Option value={el.value} key={el.value}>
                  {el.name}
                </Option>
              ))
            }
          </Select>
        )
      },
    },
    {
      title: '取消订单时长',
      dataIndex: 'cancelTime',
      render: (text, row) => {
        return (
          <div>
            <span>客户下单后&nbsp;&nbsp;</span>
            <InputNumber
              min={1}
              max={600}
              defaultValue={text}
              placeholder="请输入"
              precision={0}
              onChange={(value) => { this.handleUpdateOrderList('cancelTime', value, row) }} 
            />
            <span>&nbsp;&nbsp;分钟&nbsp;&nbsp;后未付款，自动取消订单。&nbsp;&nbsp;</span>
          </div>
        )
      },
    },
    {
      title: '取消订单提醒内容',
      dataIndex: 'content',
      render: (text, row) => {
        return (
          <Input
            defaultValue={text}
            onChange={(value) => { this.handleUpdateOrderList('content', value, row) }}
            placeholder="请输入" />
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <a onClick={() => { this.handleDeleteOrderType(row) }}>删除</a>
          </div>
        )
      }
    }
  ]
}

