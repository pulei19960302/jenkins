import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { Page, TabsBar } from 'components';
import { tabsFields, SHOP_TABS } from './constants';
import ShopInformationComponent from './shop';
import Operate from './operate';
import Authentication from './authentication';

class ShopInformation extends PureComponent {

  state = {
    tab: SHOP_TABS.SHOP,
    map: new Map(),
  }

  onTabsChange = ({ value }) => {
    const { tab, map } = this.state;
    map.delete(tab); // 删除map中ref。 确保每次都是新的ref存入map
    this.setState({
      tab: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tab, map } = this.state;
    const value = map.get(tab);
    value && value.handleSubmit();
  }
  onRef = (name, ref) => {
    const { map } = this.state;
    const value = map.get(name);
    if (!value) {
      map.set(name, ref);
    }
    this.setState({
      map
    })
  }

  renderTab = () => {
    const { tab } =  this.state;
    switch (tab) {
      case SHOP_TABS.SHOP:
        return (
          <ShopInformationComponent onRef={this.onRef}/>
        );
      case SHOP_TABS.OPERATE:
        return (
          <Operate onRef={this.onRef}/>
        )
      case SHOP_TABS.AUTHENTICATION:
        return (
          <Authentication onRef={this.onRef}/>
        )
    }
  }

  render() {
    return (
      <div style={{ position: 'relative'}}>
        <Page inner>
          <TabsBar
            defaultActiveKey="shop"
            tabs={tabsFields}
            onChange={this.onTabsChange}
          />
          { this.renderTab() }
        </Page>
        <Button type="primary" onClick={this.handleSubmit} style={{position: 'absolute', top: '16px', right: '40px'}}>提交</Button>

      </div>

    )
  }
}
export default ShopInformation;
