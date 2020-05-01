// 售后信息展示页面
import { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Drawer } from 'antd';
import { GoodsList, ApplyInfo, HandleResult, FinancialAudit } from './CommonAfterSale'

@Form.create()
class AfterSaleOrder extends PureComponent {
    state = {}
    render() {
        const {
            order,
            modalVisible,
            onCancel,
        } = this.props
        const drawerOpts = {
            title: '售后服务单',
            width: 650,
            visible: modalVisible,
            maskClosable: false,
            destroyOnClose: true,
            onClose: onCancel,
        }
       
        return (
            <Drawer {...drawerOpts} >
                <GoodsList order={order} />
                <ApplyInfo order={order} />
                <HandleResult order={order} />
                <FinancialAudit order={order} />
            </Drawer>
        )
    }
}

export default AfterSaleOrder
