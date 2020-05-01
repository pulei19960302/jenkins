export const getColumns = function() {
    return [
      {
        title: '变动日期',
        dataIndex: 'created_at',
      },
      {
        title: '变动类型',
        dataIndex: 'type_text',
      },
    //   {
    //     title: '变动人员',
    //     dataIndex: 'nickname',
    //     width:120,
    //     tableOverflow:true
    //   },
    //   {
    //     title: '变动人员ID',
    //     dataIndex: 'member_id',
    //   },
      {
        title:"操作人员",
        dataIndex: 'admin_username',
        width:120,
        tableOverflow:true
      },
    //   {
    //     title:"操作人员ID",
    //     dataIndex: 'admin_uid',
    //   },
      {
        title: '备注',
        dataIndex: 'content',
        width:400,
        tableOverflow:true
      },
    ]
}
export const searchFields = [
    {
        key: 'time',
        searchKeys: ['start_time', 'end_time'],
        placeholder: ['变动日期', '结束日期'],
        itemCol: 12,
        type: 'dateRange',
      },
    {
        type: 'enum',
        key: 'type',
        placeholder: '变动类型',
        enums: [
            { value: '', name: '全部' },
            { value: 1, name: '新增成员' },
            { value: 2, name: '关系变动' },
            { value: 3, name: '类型变动' },
            { value: 4, name: '其他' },
        ],
    },
]