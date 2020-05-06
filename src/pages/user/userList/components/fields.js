import React, { Fragment } from 'react'
import { Divider, Badge, Tooltip } from 'antd'
import TableDropDown from 'components/TableDropDown'
const StatusEnums = [
  { value: -1, name: '全部' },
  { value: 1, name: '启用' },
  { value: 2, name: '禁用' },
  // { value: 3, name: '待审核' },
]
const StatusMap = StatusEnums.reduce((a, b) => {
  a[b.value] = b.name
  return a
}, {})
export const searchFields = [
  {
    key: 'keyword',
    // itemCol: 12,
    placeholder: '请输入用户id或名称',
  },
  {
    key: 'mobile',
    // itemCol: 12,
    placeholder: '手机号',
  },
  {
    type: 'enum',
    key: 'status',
    placeholder: '状态',
    enums: StatusEnums,
  },
  {
    key: 'time',
    searchKeys: ['start_time', 'end_time'],
    placeholder: ['注册时间', '结束时间'],
    // itemCol: 12,
    type: 'dateRange',
  },
  {
    type: 'inputRange',
    searchKeys: ['balance_min_price', 'balance_max_price'],
    key: 'balance_price',
    placeholder: ['最低余额', '最高余额']
  },
  //   {
  //     type: 'enum',
  //     key: 'recommend_user_level',
  //     placeholder: '推荐人',
  //     enums: [
  //         { value: 1, name: '推荐人' },
  //         { value: 2, name: '直属上级' },
  //         { value: 3, name: '间接上级' },
  //     ],
  //   },
  //   {
  //     key: 'recommend_user_id',
  //     // itemCol: 12,
  //     placeholder: '推荐人id',
  //   },
  {
    type: 'mutipulLevelInput',
    enums: [
      { value: 1, name: '推荐人' },
      // { value: 2, name: '直属上级' },
      // { value: 3, name: '间接上级' },
    ],
    placeholders: ['用户等级', '输入id'],
    searchKeys: ['recommend_user_level', 'recommend_user_id'],
    key: 'searchUserLevel',
    inputType: 'Number',
    initialValue: [1, ''],
    initProps: {
      min: 1,
      precision: 0
    }
  },
  {
    type: 'inputRange',
    searchKeys: ['consumer_min_price', 'consumer_max_price'],
    key: 'consumer_price',
    placeholder: ['最低消费', '最高消费']
  },
  {
    type: 'inputRange',
    searchKeys: ['order_min_num', 'order_max_num'],
    key: 'order_price',
    placeholder: ['最低订单', '最高订单'],
    initProps: {
      min: 1,
      precision: 0
    }
  },
  {
    type: 'inputRange',
    searchKeys: ['integral_min_num', 'integral_max_num'],
    key: 'integralprice',
    placeholder: ['最低积分', '最高积分'],
    initProps: {
      min: 1,
      precision: 0
    }
  },
  //   {
  //     key: 'recommend',
  //     // itemCol: 12,
  //     placeholder: '推荐人',
  //   },
]

const NickNameDetail = (id, name, type, phone) => {
  return (
    <div>
      <div>ID：&nbsp;&nbsp;&nbsp;&nbsp;{id}</div>
      <div>昵称：{name}</div>
      <div>类型：{type}</div>
      <div>电话：{phone}</div>
    </div>
  )
}

export const getColumns = function (tabsEnum) {
  return [
    {
      title: '用户ID',
      dataIndex: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      width: 140,
      fixed: 'left',
      render: (text, row) => <a href={`#/user/userDetail/${row.id}`}>{text}</a>
    },
    {
      title: '用户类型',
      dataIndex: 'member_type_id',
      width: 120,
      render: (text) => <span>{tabsEnum[text]}</span>
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 140,
    },
    {
      title: '推荐人',
      dataIndex: 'recommend_parent_nickname',
      width: 140,
      render: (text, row) => <Tooltip title={
        NickNameDetail(row.recommend_parent_id, row.recommend_parent_nickname, tabsEnum[row.recommend_parent_type], row.recommend_parent_phone)
      }>
        <a href={`#/user/userDetail/${row.recommend_parent_id}`}>{text}</a>
      </Tooltip>
    },
    // {
    //   title: '直属上级',
    //   dataIndex: 'recommend_father_parent_nickname',
    //   width: 120,
    //   render:(text,row)=><Tooltip title={
    //     NickNameDetail(row.recommend_father_parent_id,row.recommend_father_parent_nickname,tabsEnum[row.recommend_father_parent_type],row.recommend_father_parent_phone)
    // }>
    //     <a href={`#/user/userDetail/${row.recommend_father_parent_id}`}>{text}</a>
    // </Tooltip>
    // },
    // {
    //     title: '间接上级',
    //     dataIndex: 'recommend_parent_top_nickname',
    //     width: 120,
    //     render:(text,row)=><Tooltip title={
    //         NickNameDetail(row.recommend_parent_top_id,row.recommend_parent_top_nickname,tabsEnum[row.recommend_parent_top_type],row.recommend_parent_top_phone)
    //     }>
    //         <a href={`#/user/userDetail/${row.recommend_parent_top_id}`}>{text}</a>
    //     </Tooltip>
    // },
    {
      title: '余额',
      dataIndex: 'balance',
      width: 120,
    },
    {
      title: '累计积分',
      dataIndex: 'integral',
      width: 130,
    },
    {
      title: '订单数量',
      dataIndex: 'total_order_num',
      width: 120,
    },
    {
      title: '消费金额',
      dataIndex: 'total_consumer_price',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render(status) {
        return (
          <Badge
            color={+status === 1 ? 'green' : 'red'}
            text={StatusMap[status]}
          />
        )
      },
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      width: 240,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 180,
      render: (text, row) => (
        <div>
          {
            $api.user.userInfo.permission() &&
            <a onClick={() => {
              this.goDetail(row.id)
            }}>查看</a>
          }

          <Divider type="vertical" />
          {
            $api.user.userEdit.permission() &&
            <Fragment>
              <a
                onClick={() => {
                  this.toogleEdit(true, row)
                }}
              >
                编辑
            </a>
              <Divider type="vertical" />
            </Fragment>
          }

          <TableDropDown
            items={[
              {
                label: '启用',
                value: 'up',
                permission: $api.user.userType.permission(),
                hide: +row.status === 1,
              },
              {
                label: '禁用',
                value: 'disable',
                permission: $api.user.userType.permission(),
                hide: +row.status === 2,
              },
              {
                label: '修改类型',
                value: 'type',
                permission: $api.user.userChangeType.permission()
              },
              {
                label: '修改上级',
                value: 'switch',
                permission: $api.user.userUpLevel.permission()
              },
              {
                label: '调整积分',
                value: 'switch_intergral',
                permission: $api.user.userUpIntergral.permission()
              },
              {
                label: '删除',
                value: 'del',
                type: 'danger',
                permission: $api.user.userDel.permission(),
              }
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
