/**
 * File: Tab 标签管理，复用了 AntD Tab 样式
 */

import React, { Component } from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tabs } from 'antd';
import { BtnGroup } from 'components'
import { looseEqual } from 'utils'

const TabPane = Tabs.TabPane
class TabsBar extends Component {
  static defaultProps = {
    tabs: [], // tabs 数据源 eg: [{title: '已完成', value: '34', icon:'user', paramName: 'status'}]
    defaultActiveKey: '0', // 默认显示的 tab index
    onChange: () => {}, // change 的触发函数
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }
  shouldComponentUpdate(nextProps){
    return !looseEqual(nextProps, this.props)
 }
  handleChange(activeKey) {
    const { onChange, tabs } = this.props
    const activeTab = tabs[activeKey]
    if (onChange && typeof onChange === 'function') {
      onChange(activeTab)
    }
  }
  render() {
    const { tabs, defaultActiveKey, btns } = this.props
    let index = 0
    tabs.forEach((it, i) => {
      if (it.value === defaultActiveKey) {
        index = i
      }
    })
    const tabsProps = {
      ...this.props,
      onChange: this.handleChange,
      defaultActiveKey: String(index),
    }
    if (btns) {
      tabsProps.tabBarExtraContent = (<BtnGroup btns={btns}></BtnGroup>)
    }
    return (
      <Tabs {...tabsProps}>
        {tabs.map((tab, index) => (
          <TabPane
            key={index}
            tab={
              <span>
                {tab.icon && <LegacyIcon type={tab.icon} />}
                {tab.title}
              </span>
            }
          />
        ))}
      </Tabs>
    );
  }
}
export default TabsBar
