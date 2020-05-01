import { Divider, Popconfirm } from 'antd'
export const getColumns = function(onEdit, onDel) {
  return [
    {
      title: '收货人',
      dataIndex: 'name',
      width:130,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width:130,
    },
    {
        title: '默认地址',
        dataIndex: 'is_default',
        width: 120,
        render:(text)=>+text===0?'否':'是'
      },
    {
      title: '详细地址',
      dataIndex: 'address',
    //   width:200,
      tableOverflow:true,
      dataFn:(row)=>`${row.province}${row.city}${row.district}${row.address}`,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 180,
      render: (text, row) => (
        <div>
        {
            $api.user.userAddressEdit.permission() &&
            <a
            onClick={() => {
              onEdit(row)
            }}
          >
            编辑
          </a>
        }
          <Divider type="vertical" />
          {
            $api.user.userAddressDel.permission() &&
            <Popconfirm
            title="你确定要删除这条地址么?"
            placement="topRight"
            onConfirm={() => {
              onDel(row.id)
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
      ),
    },
  ]
}
