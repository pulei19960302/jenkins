import { Divider,Popconfirm, Badge } from 'antd'

export const searchFields =[
    {
        type:'mutipulLevelInput',
        enums: [
            { value: 'member_id', name: '用户ID' },
            { value: 'member_name', name: '用户名称' },
            { value: 'mobile', name: '手机号码' },
        ],
        placeholders:['请选择','请输入'],
        searchKeys: ['user_search_type', 'user_search_input'],
        key:'searchUserLevel',
        itemCol: 8,
        initialValue:['member_id','']
    },
    {
        type: 'enum',
        key: 'status',
        placeholder: '状态',
        enums: [
            { value: -1, name: '全部' },
            { value: 0, name: '待审核' },
            { value: 1, name: '已通过' },
            { value: 2, name: '已驳回' },
        ]
    },
    {
        key: 'time',
        searchKeys: ['start_date', 'end_date'],
        placeholder: ['开始日期', '结束日期'],
        // itemCol: 12,
        type: 'dateRange',
    },
]

export const getColumns = function() {
  return [
    {
      title: '用户ID',
      dataIndex: 'member_id',
      width: 80,
      // fixed: 'left',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '累计积分',
      dataIndex: 'total_integral',
    },
    {
      title: '当前类型',
      dataIndex: 'current_member_type_name',
    },
    {
      title: '申请类型',
      dataIndex: 'next_member_type_name',
    },
    {
      title: '状态',
      dataIndex: 'result',
      // render:(text)=><span>{({
      //     0:'待审核',
      //     1:'通过',
      //     2:'驳回',
      // })[text]}</span>
      render(text) {
        return (
          <Badge
            color={({
              0:'#cccccc',
              1:'green',
              2:'red',
            })[text]}
            text={({
              0:'待审核',
              1:'已通过',
              2:'已驳回',
            })[text]}
          />
        )
      },
    },
    {
      title: '申请时间',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 150,
      // fixed:'right',
      render: (text, row) => (
        row.result === 0?(
          <div>
          {
            $api.user.auditAdopt.permission()&&
            <Popconfirm
              title="你确定要通过/驳回申请？"
              placement="topRight"
              onConfirm={() => {
                this.auditAdopt(String(row.id))
              }}
              okText="确认"
              cancelText="取消"
            >
              <a>
                通过
              </a>
            </Popconfirm>
          }
          {
            $api.user.auditAdopt.permission() && $api.user.auditRefuse.permission() && <Divider type="vertical" />
          }
          {
            $api.user.auditRefuse.permission()&&
            <Popconfirm
              title="你确定要通过/驳回申请？"
              placement="topRight"
              onConfirm={() => {
                  this.auditRefuse(String(row.id))
              }}
              okText="确认"
              cancelText="取消"
            >
              <a
                className="fcred5"
              >
                驳回
              </a>
            </Popconfirm>
          }
          </div>
        ):null
      ),
    },
  ]
}
