import React from 'react'
import { Divider, Badge } from 'antd'
import TableDropDown from 'components/TableDropDown'
import { PreviewImg } from 'components'

export const searchFields = [
  {
    key: 'name',
    // itemCol: 12,
    placeholder: '请输入品牌名称',
  },
  {
    type: 'enum',
    key: 'status',
    placeholder: '状态',
    enums: [
      { value: -1, name: '全部' },
      { value: 1, name: '启用' },
      { value: 2, name: '禁用' },
    ],
  },
]
export const getColumns = function() {
  return [
    {
      title: '品牌ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      tableOverflow: true,
    },
    {
      title: '品牌LOGO',
      dataIndex: 'logo',
      key: 'logo',
      width: 120,
      // previewImg: true,
      render(text) {
        return (
          <img
            src={text}
            style={{ marginLeft: 5, width: 40, height: 40, borderRadius: 3, cursor: 'pointer' }}
            alt=""
            onClick={() => {
              PreviewImg({ imgUrl: text })
            }}
          />
        )
      },
    },
    {
      title: '品牌别名',
      dataIndex: 'alias',
      key: 'alias',
      width: 120,
      tableOverflow: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status_name',
      width: 120,
      render(status_name) {
        return (
          <Badge
            color={status_name === '启用' ? 'green' : 'red'}
            text={status_name}
          />
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
      render: (text, row) => (
        <div>
          <a
            onClick={() => {
              this.goDetail(true, row)
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          {
            $api.brands.brandsEdit.permission() &&
            <React.Fragment>
              <a
                onClick={() => {
                  this.toogleEdit(true, 'edit', row)
                }}
              >
                编辑
              </a>
              <Divider type="vertical" />
            </React.Fragment>
          }
          <TableDropDown
            items={[
              {
                label: '启用',
                value: 'up',
                permission: $api.brands.brandsStatus.permission(),
                hide: row.status_name === '启用',
              },
              {
                label: '禁用',
                value: 'disable',
                permission: $api.brands.brandsStatus.permission(),
                hide: row.status_name === '禁用',
              },
              {
                label: '删除',
                value: 'del',
                type: 'danger',
                permission: $api.brands.brandsDel.permission(),
              },
            ].filter(
              it => (it.permission || it.permission === undefined) && !it.hide
            )}
            itemClick={this.tableMoreClick}
            row={row}
          />
        </div>
      ),
    },
  ]
}
