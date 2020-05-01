import { Divider,Popconfirm } from 'antd'
import { Fragment } from 'react';
export const getColumns = function() {
  return [
    {
        title: 'ID',
        dataIndex: 'id',
      },
    {
      title: '等级',
      dataIndex: 'sort',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'created_at',
        width:200
    },
    {
        title: '修改时间',
        dataIndex: 'updated_at',
        width:200
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width:180,
      render: (text, row) => (
        <div>
        {
            $api.user.editLevel.permission() && 
            <Fragment>
                <a onClick={()=>{this.goSet(row.id)}}>设置</a>
        
            </Fragment>
        }
        {
            $api.user.delLevel.permission()&&
            +row.sort===+row.biggst &&
            <Fragment>
                <Divider type="vertical" />
                    <Popconfirm
                    title="确认删除这个等级?"
                    placement="topRight"
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
          </Fragment>
        }
        </div>
      ),
    },
  ]
}
