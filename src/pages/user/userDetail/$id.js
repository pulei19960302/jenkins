import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { Page } from 'components'
import LeftPanel from './components/LeftPanel/LeftPanel'
import RightPanel from './components/RightPanel/RightPanel'
import styles from './index.less'
@connect(({ user, userDetail, loading }) => ({
  user,
  loading,
  userDetail,
}))
class UserDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        key:0
    }
  }
  reRender=(key)=>{
    this.setState({
        key
    })
  }
  render() {
    const id = this.props.match.params.id
    const { key } = this.state
    return (
      <Page key={key} style={{ backgroundColor: 'inherit', padding: 0 }} inner>
        <Row className={styles.pageContainer} gutter={16}>
          <Col span={6}>
            <LeftPanel reRender={this.reRender} id={id}></LeftPanel>
          </Col>
          <Col span={18}>
            <RightPanel id={id}></RightPanel>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default UserDetail
