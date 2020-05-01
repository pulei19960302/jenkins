/**
 * table 更多 下拉
 * @params:
 * items : [ {value:'edit',lable:'编辑',type:'danger'} ] type deafult : 'primary'
 * row: 行数据
 * itemClick 回调 两个参数 选中的 value 和 row
 * trigger: default:'hover'
 */
import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
export default function TableDropDown(props) {
  const { items, itemClick, row, trigger } = props
  if (!items || !items.length) return null
  const overlay = (
    <Menu
      onClick={e => {
        itemClick(e.key, row)
      }}
    >
      {items.map(it => (
        <Menu.Item
          style={{ color: COLOR[it.type] || COLOR['primary'] }}
          key={it.value}
        >
          {it.label}
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown
      trigger={[trigger || 'hover']}
      overlayStyle={{ minWidth: '150px' }}
      overlay={overlay}
    >
      <Button style={{ padding: 0 }} type="link">
        更多
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
const COLOR = {
  primary: '#12C2C2',
  danger: '#ff4d4f',
}
