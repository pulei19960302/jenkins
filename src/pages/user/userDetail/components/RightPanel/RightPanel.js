import { connect } from 'dva'
import React, { PureComponent } from 'react'
import styles from './RightPanel.less'
import TeamList from './teamList'
import IntergralList from './IntergralList/IntergralList'
import TeamNote from './teamNote/teamNote'
import { Tabs } from 'antd'
import UserSummary from './userSummary'

const { TabPane } = Tabs

@connect(({ userDetail, loading }) => ({
  loading,
  userDetail,
}))
class RightPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        userAbstract:{
            caption:{},
            address:[],
            others:[],
            trade:[]
        }
    }
  }
  componentDidMount(){
      this.getData()
  }
  tabsChange = () => {}
  getData=()=>{
    $api.user.userAbstract({member_id:this.props.id}).then(res=>{
        this.setState({
            userAbstract:res.data
        })
      })
  }
  render() {
    const { tabsChange,getData } = this
    const { userAbstract } = this.state
    const { id } = this.props
    return (
      <div className={styles.rightPanelContainer} id="userDetailRightPanelContainer">
        <Tabs onChange={tabsChange}>
        {
            <TabPane tab="用户摘要" key="1">
            <UserSummary fresh={getData} userAbstract={userAbstract} uid={id}></UserSummary>
          </TabPane>
        }
          {
            <TabPane tab="团队关系" key="2">
            <TeamList id={id}></TeamList>
          </TabPane>
          }
          {
            <TabPane tab="积分明细" key="3">
            <IntergralList id={id}></IntergralList>
          </TabPane>
          }
          {
            <TabPane tab="团队变动" key="4">
            <TeamNote id={id}></TeamNote>
          </TabPane>
          }
          
        </Tabs>
      </div>
    )
  }
}
export default RightPanel
