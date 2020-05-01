/**
 * 按钮组组件
 * props:
 * btns 按钮数组{type:类型 icon: 图标 name:名称,handleClick(按钮操作) }
 */

import React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button } from 'antd'
import styles from './index.less'
import { Export, Import, TemplateDownload } from 'components'

export default class BtnGroup extends React.Component {
  render() {
    const { btns } = this.props
    return (
      <div className={styles.btns}>
        {btns.map((field, index) => {
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
              key={index}
              type={field.type || 'primary'}
              icon={<LegacyIcon type={field.icon || ''} />}
              loading={field.loading || false}
              onClick={field.handleClick}
            >
              {field.name}
            </Button>
          );
        })}
      </div>
    );
  }
}
