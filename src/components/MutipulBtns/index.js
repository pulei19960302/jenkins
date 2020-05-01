/**
 * 按钮组组件
 * props:
 * btns 按钮数组{type:类型 icon: 图标 name:名称,key:批量操作标识(非必须) }
 * mutipulClick
 */

import React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button, Dropdown, Menu } from 'antd';
import { Export, Import, TemplateDownload } from 'components'

export default class MutipulBtns extends React.Component {
  render() {
    let { btns = [], mutipulClick,showNum=2,arrowDirection="up" } = this.props
    if(btns.length<3){
        showNum = 2
    }
    let btnArr1 = btns.slice(0, showNum)
    let btnArr2 = btns.slice(showNum, btns.length)
    const menu = (
      <Menu
        placement="topCenter"

      >
        {btnArr2.map( (field, index) => (
          <Menu.Item onClick={field.handleClick || (()=>{mutipulClick && mutipulClick(field.key, field)})} key={index}>
            <GetMenuItem field={field}></GetMenuItem>
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <div>
        {!!btnArr1.length &&
          btnArr1.map((field, index) => (
            <GetBtn field={field} mutipulClick={mutipulClick} key={index}></GetBtn>
          ))}
        {!!btnArr2.length && (
          <Dropdown overlay={menu}>
            <Button>
              更多操作 <LegacyIcon type={arrowDirection} />
            </Button>
          </Dropdown>
        )}
      </div>
    );
  }
}
const GetBtn = ({field,mutipulClick})=>{
          if (field.type === 'export') {
            return <Export key={field.type} {...field} />
          }
          if (field.type === 'import') {
            return <Import key={field.type} {...field} />
          }
          if (field.type === 'templateDowbload') {
            return <TemplateDownload key={field.type} {...field} />
          }
          return (
            <Button
              key={field.name}
              type={field.type || 'default'}
              icon={<LegacyIcon type={field.icon || ''} />}
              loading={field.loading || false}
              className="mr8"
              onClick={field.handleClick ||
                (e => {
                  mutipulClick(field.key, field)
                })}
            >
              {field.name}
            </Button>
          );
}
const GetMenuItem = ({field})=>{
    if (field.type === 'export') {
        return <Export isBtn={false} key={field.type} {...field} />
      }
      if (field.type === 'import') {
        return <Import isBtn={false} key={field.type} {...field} />
      }
      if (field.type === 'templateDowbload') {
        return <TemplateDownload isBtn={false} key={field.type} {...field} />
      }
      return (
        <span>
          {field.icon && <LegacyIcon type={field.icon} />}
          {field.name}
        </span>
      );
}
