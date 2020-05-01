import React from 'react'
import { Switch, Divider } from 'antd'


export const getColumns = (context) => {

  const { currentStatus } = context.props;

  return [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '类目名称',
      dataIndex: 'name',
    },
    {
      title: '类目图片',
      dataIndex: 'thumb',
      width: 100,
      previewImg: true,
    },
    {
      title: '类目状态',
      dataIndex: 'status',
      render(text, row) {
        return (
          <Switch unCheckedChildren="禁用" checkedChildren="启用" disabled={!$api.category.categoryStatus.permission() || currentStatus !== 1} checked={Number(row.status) === 1} onChange={(status) => context.handleTableSwitch(row.id, status ? 1 : 2)}/>
        )
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      render: (text, row) => {
        return (
          <div>
            {
              $api.category.categoryEdit.permission() &&
              <a onClick={() => {
                context.editCategory(row)
              }}>
                编辑
              </a>
            }
            <Divider type="vertical"/>
            {
              $api.category.categoryDel.permission() &&
              <React.Fragment>
                <a onClick={() => {
                  context.delCategory(row)
                }}>
                  删除
                </a>
              </React.Fragment>
            }
          </div>
        )
      },
    },
  ]
}
