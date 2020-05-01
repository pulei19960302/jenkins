import { Divider,Popconfirm } from 'antd'
export const searchFields = [
  {
    key: 'keywords',
    placeholder: '请输入群组名称或客户账号',
  },
]
export const getColumns = function() {
  return [
    {
      title: '社群名称',
      dataIndex: 'name',
    },
    {
      title: '用户数',
      dataIndex: 'user_num',
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
      width:200
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width:200
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 180,
      render:(_, row)=> {
        return (
          <div>
          {
            $api.user.groupEdit.permission()&&
            <a
              onClick={() => {
                this.toogleAddGroup(true, row)
              }}
            >
              编辑
            </a>
          }
            
            <Divider type="vertical" />
            {/* <a
              onClick={() => {
                this.toogleLinkUser(true, row)
              }}
            >
              管理成员
            </a>
            <Divider type="vertical" /> */}
            {
                $api.user.groupDel.permission() &&
                <Popconfirm
                placement="topRight"
                title="确认删除?"
                onConfirm={() => {
                    this.del(row.id)
                }}
                okText="确认"
                cancelText="取消"
            >
                <a
                className="fcred5"
                >
                删除
                </a>
            </Popconfirm>
            }
            
          </div>
        )
      },
    },
  ]
}
