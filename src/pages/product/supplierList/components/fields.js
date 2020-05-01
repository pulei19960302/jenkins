import React from 'react'
import { Divider, Badge } from 'antd'
import TableDropDown from 'components/TableDropDown'
export const searchFields = [
  {
    key: 'name',
    // itemCol: 12,
    placeholder: '请输入供应商名称',
  },
  {
    type: 'enum',
    key: 'type',
    placeholder: '类型',
    enums: [{ value: 1, name: '自营' }, { value: 2, name: '代发' }],
  },
  {
    key: 'category',
    // itemCol: 12,
    placeholder: '请输入经营类目',
  },
  {
    key: 'brand',
    // itemCol: 12,
    placeholder: '请输入品牌名称',
  },
]
export const getColumns = function() {
  return [
    {
      title: 'ID',
      width: 40,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      tableOverflow: true,
    },
    {
      title: '供应商类型',
      dataIndex: 'company_type',
      key: 'company_type',
      width: 120,
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '经营品牌',
      dataIndex: 'brand_text',
      key: 'brand_text',
      width: 120,
    },
    {
      title: '经营类目',
      dataIndex: 'sale_text',
      key: 'sale_text',
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
            $api.supplier.supplierEdit.permission() &&
            <React.Fragment>
              <a
                onClick={() => {
                  this.supplierEdit(row.id)
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
                permission: $api.supplier.supplierStatus.permission(),
                hide: row.status_name === '启用',
              },
              {
                label: '禁用',
                value: 'disable',
                permission: $api.supplier.supplierStatus.permission(),
                hide: row.status_name === '禁用',
              },
              {
                label: '删除',
                value: 'del',
                type: 'danger',
                permission: $api.supplier.supplierDel.permission(),
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

export const getDrawerData = [
  {
    title: '基本信息',
    key: 'basic',
    content: [
      {
        key: 'name',
        titleName: '供应商名称',
        dataField: 'name',
      },
      {
        key: 'short_name',
        titleName: '简称',
        dataField: 'short_name',
      },
      {
        key: 'alipay',
        titleName: '支付宝号 （对公）',
        dataField: 'alipay',
      },
    ],
  },
  {
    title: '联系方式',
    key: 'contactWay',
    content: [
      {
        key: 'contact',
        titleName: '联系人',
        dataField: 'contact',
      },
      {
        key: 'phone',
        titleName: '联系电话',
        dataField: 'phone',
      },
      {
        key: 'address',
        titleName: '发货地址',
        dataField: 'address',
      },
      {
        key: 'company_type',
        titleName: '供应商类型',
        dataField: 'company_type',
      },
    ],
  },
  {
    title: '银行账号',
    key: 'bank',
    content: [
      {
        key: 'bank_name',
        titleName: '银行名称',
        dataField: 'bank_name',
      },
      {
        key: 'bankno',
        titleName: '银行账号',
        dataField: 'bankno',
      },
      {
        key: 'open_name',
        titleName: '开户名称',
        dataField: 'open_name',
      },
    ],
  },
  {
    title: '经营范围',
    key: 'manage',
    content: [
      {
        key: 'brand_text',
        titleName: '品牌',
        dataField: 'brand_text',
      },
      {
        key: 'sale_text',
        titleName: '类目',
        dataField: 'sale_text',
      },
    ],
  },
  {
    title: '经营资质',
    key: 'qualification',
    content: [
      {
        key: 'license_img',
        titleName: '经营资质',
        dataField: 'license_img',
        type: 'image',
      },
    ],
  },
]
