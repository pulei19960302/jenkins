export const getSearchFields = (statusEnum = []) => {
  return [
    {
      key: '提现状态',
      type: 'enum',
      placeholder: '提现状态',
      // enums: statusEnum,
      enums: [
        { value: '-1', name: '全部提现状态' },
        { value: '0', name: '待审核' },
        { value: '1', name: '审核中' },
        { value: '2', name: '拒绝申请' },
        { value: '3', name: '转银行处理' },
        { value: '4', name: '银行处理中' },
        { value: '5', name: '银行退回' },
        { value: '6', name: '提现成功' },
      ],
    },
    {
      key: 'date',
      type: 'date',
      placeholder: '选择日期',
    },
  ]
}

export const getColumns = function () {
  return [
    {
      title: '编号',
      dataIndex: '编号',
    },
    {
      title: '日期',
      dataIndex: '日期',
    },
    {
      title: '服务费',
      dataIndex: '服务费',
    },
    {
      title: '总交易额',
      dataIndex: '总交易额',
    },
    {
      title: '订单量',
      dataIndex: '订单量',
    },
    {
      title: '创建时间',
      dataIndex: '创建时间',
    },
    {
      title: '备注',
      dataIndex: '备注',
    },
    {
      title: '操作',
      dataIndex: '操作',
      render: (text, row) => {
        return <a onClick={this.handleAddNotes}>备注</a>
      },
    },
  ]
}