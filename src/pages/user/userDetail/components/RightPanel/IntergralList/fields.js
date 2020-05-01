export const getColumns = function() {
    return [
      {
        title: '日期',
        dataIndex: 'created_at',
      },
      {
        title: '来源/用途',
        dataIndex: 'show_type',
      },
      {
          title:'订单',
          dataIndex:'order_no',
          width: 140,
      },
      {
        title: '交易积分',
        dataIndex: 'point',
      },
      {
        title: '变动后积分',
        dataIndex: 'integral',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 120,
        tableOverflow:true
      },
      {
        title: '操作人',
        dataIndex: 'admin_username',
      },
    ]
}
export const searchFields = [
    {
        type: 'enum',
        key: 'type',
        placeholder: '积分类型',
        enums: [
            { value: -1, name: '全部' },
            { value: 1, name: '本人下单' },
            { value: 2, name: '下级下单' },
            { value: 3, name: '人工添加' },
            { value: 4, name: '人工扣除' },
        ],
    },
    {
        key: 'time',
        searchKeys: ['start_time', 'end_time'],
        placeholder: ['开始时间', '结束时间'],
        itemCol: 12,
        type: 'dateRange',
      },
]