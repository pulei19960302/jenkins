/**
 * 侧滑底部组件
 * props:
 * onCancel 取消回调 cancelText 取消文字 onOk确认回调 okText确认文字 confirmLoading 提交时的loading状态
 * btns: 按钮组 type 类型 name名称 icon 图标 
 * 注：如果传入btns，就不会使用默认的取消和确定按钮
 */

import React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button } from 'antd'
import styles from './index.less'

export default class DrawerFooter extends React.Component {
  render() {
    const {
      btns,
      onCancel,
      cancelText = '取消',
      onOk,
      okText = '确定',
      confirmLoading = false,
    } = this.props
    return (
      <div className={styles.drawerFooter}>
        {
          !!btns && btns.map(field => (
            <Button
              key={field.name}
              onClick={()=>onOk(field)}
              type={field.type || 'primary'}
              icon={<LegacyIcon type={field.icon || ''} />}
              loading={field.loading || false}>
              {field.name}
            </Button>
          ))
        }
        {
          !btns && <Button onClick={onCancel}>
            {cancelText}
          </Button>
        }
        {
          !btns &&  <Button onClick={onOk} type="primary" loading={confirmLoading}>
            {okText}
          </Button>
        }
        {this.props.children}
      </div>
    );
  }
}
