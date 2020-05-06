import React, { useState, useEffect, useRef } from 'react'
import { Button, Spin  } from 'antd'
import { Page, TabsBar } from 'components'
import { tabsFields, SHOP_TABS } from './constants'
import ShopInformationComponent from './shop'
import Operate from './operate'
import Authentication from './authentication'

const ShopInformation = () => {

  const [baseInfo, setBaseInfo] = useState({});
  const [tab, setTab] = useState(SHOP_TABS.SHOP);
  const [map, setMap] = useState(new Map());
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const getBaseInfo = async () => {
      $api.system.getCompany({},{loadingFn: togglePageLoading}).then(_=>{
        const data = {..._.data, about_us: _.data.about_us ? _.data.about_us : ""}
        setBaseInfo(data);
      })
    }
    getBaseInfo();
    if (tab === SHOP_TABS.SHOP) {
      setAuth($api.system.saveCompany.permission())
    }
  }, [tab])

  const onTabsChange = ({ value }) => {

    switch (value) {
      case SHOP_TABS.SHOP:
        setAuth($api.system.saveCompany.permission());
        break;
      case SHOP_TABS.OPERATE:
        setAuth($api.system.saveCompany.permission());
        break;
      case SHOP_TABS.AUTHENTICATION:
        setAuth($api.system.saveCompany.permission());
        break;
    }

    map.delete(tab); // 删除map中ref。 确保每次都是新的ref存入map
    setTab(value);
    setMap(map);
  }

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const value = map.get(tab);
    value && value.handleSubmit();
  }

  const onRef = (name, ref) => {
    const value = map.get(name);
    if (!value) {
      map.set(name, ref);
    }
    setMap(map);
  }

  const togglePageLoading = loading => {
    setPageLoading(loading)
  }


  const renderTab = () => {
    switch (tab) {
      case SHOP_TABS.SHOP:
        return (
          <ShopInformationComponent onRef={onRef} { ...baseInfo} toggleLoading={setLoading} />
        )
      case SHOP_TABS.OPERATE:
        return (
          <Operate onRef={onRef} { ...baseInfo } toggleLoading={setLoading} />
        )
      case SHOP_TABS.AUTHENTICATION:
        return (
          <Authentication onRef={onRef} {...baseInfo} toggleLoading={setLoading} />
        )
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Page inner>
        {
          pageLoading && <Spin style={{  position: 'absolute',
            zIndex: 99,
            top: '30%',
            left: '50%',
            transform: 'translate(-30%, -50%)'
          }}/>
        }
        <TabsBar
          defaultActiveKey="shop"
          tabs={tabsFields}
          onChange={onTabsChange}
        />
        {renderTab()}
      </Page>
      {
        auth ? <Button loading={loading} type="primary" onClick={handleSubmit} style={{ position: 'absolute', top: '16px', right: '40px' }}>提交</Button>
          : null
      }

    </div>
  )
}

export default ShopInformation
