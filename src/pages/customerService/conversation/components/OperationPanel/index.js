import { PureComponent } from 'react'
import { Tabs } from 'antd'
import OrderInfo from './OrderInfo'
import AfterSale from './AfterSale'
import UserInfo from './UserInfo'
import WorkOrder from './WorkOrder'
import styles from './index.less'
const { TabPane } = Tabs

class OperationPanel extends PureComponent {
    state = {

    }

    tabChange = (key) => {

    }
    render() {
        return (
            <div className={styles.panel}>
                <Tabs defaultActiveKey="1"
                    onChange={this.tabChange}
                    className="tabs" >
                    <TabPane tab="订单" key="1" forceRender>
                        <OrderInfo />
                    </TabPane>
                    <TabPane tab="售后" key="2" forceRender>
                        <AfterSale />
                    </TabPane>
                    {/* <TabPane tab="工单" key="3" forceRender>
                        <WorkOrder />
                    </TabPane> */}
                    {
                        $api.user.userInfo.permission() &&
                        <TabPane tab="用户" key="4" forceRender>
                            <UserInfo />
                        </TabPane>
                    }
                </Tabs>
            </div>
        )

    }
}

export default OperationPanel