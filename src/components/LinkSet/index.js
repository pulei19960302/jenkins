import React,{PureComponent} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Tabs, Input, Button } from 'antd';
import { tabItems,findActivityTab } from './fields'
import PageList from './pageList'
import SystemList from './systemList'
import ProductList from './productList'
import OtherLink from './otherLink'
import ProductCat from './productCat'

const { TabPane } = Tabs

export default class LinkSet extends PureComponent {
    state={
        loading:false,
        linkOptions:{},
        linkType:'',
        linkParams:'',
        linkDesc:'',
        activeKey:'',
    }
    static getDerivedStateFromProps(props, state) {
        if(props.linkOptions!==state.linkOptions){
            const { linkOptions } = props
            const { linkType,linkParams,linkDesc } = linkOptions
            return {
                linkType,
                linkParams,
                linkOptions,
                activeKey:findActivityTab(linkType),
                linkDesc
            }
        }
        return null
    }
    handleOk=()=>{
        const { linkParams,linkType,linkDesc } = this.state
        console.log(linkParams,linkType,linkDesc)
        this.props.submit({
            linkParams,linkType,linkDesc
        })
        this.props.toogle(false)
    }
    handleCancel=()=>{
        this.props.toogle(false)
    }
    tabsChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }
    onCheck=(linkParams,linkType,linkDesc)=>{
        this.setState({
            linkParams,linkType,linkDesc
        })
    }
    render(){
        const { visible } = this.props
        const { loading,activeKey,linkParams,linkType } = this.state
        const { handleOk,handleCancel,tabsChange,onCheck } = this
        return (
            <div>
                <Modal
                    title="跳转设置"
                    width={1000}
                    visible={visible}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    confirmLoading={loading}
                >
                <div style={{height:500,overflow:'scroll'}}>
                    <Tabs activeKey={activeKey} onChange={tabsChange}>
                        <TabPane tab={tabItems[0].name} key={tabItems[0].linkType}>
                            <SystemList onCheck={onCheck} linkType={linkType}></SystemList>
                        </TabPane>
                        <TabPane tab={tabItems[1].name} key={tabItems[1].linkType}>
                            <ProductList onCheck={onCheck} linkParams={linkParams}></ProductList>
                        </TabPane>
                        <TabPane tab={tabItems[2].name} key={tabItems[2].linkType}>
                            <ProductCat onCheck={onCheck} linkType={linkType} linkParams={linkParams}></ProductCat>
                        </TabPane>
                        <TabPane tab={tabItems[3].name} key={tabItems[3].linkType}>
                            <PageList onCheck={onCheck} linkParams={linkParams}></PageList>
                        </TabPane>
                        <TabPane tab={tabItems[4].name} key={tabItems[4].linkType}>
                            <OtherLink onCheck={onCheck} linkParams={linkParams} linkType={linkType}></OtherLink>
                        </TabPane>
                    </Tabs>
                </div>
                </Modal>
            </div>
        )
    }
}