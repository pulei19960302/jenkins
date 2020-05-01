import React, { PureComponent } from 'react'
import { Row, Col, Radio } from 'antd'
import styles from './teamList.less'
import CommonTable from 'components/CommonTable'
import { getColumns, ToogleTeamList } from './fields'
import TeamListChart from './teamListChart'

class TeamList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      teamList: [],
      teamListLoading: false,
      bigPanelActiveIndex: 0,
      teamInfo:{},
      key:1,
      showWay:'table'
    }
  }
  componentDidMount(){
      $api.user.userTeamInfo({
        member_id:this.props.id,
      }).then(res=>{
        this.setState({
            teamInfo:res.data
        })
      })
  }
  getTeamList = ({ page, pageSize }) => {
    this.setState({
      teamListLoading: true,
    })
    return $api.user
      .userTeamList({
        page,
        page_size:pageSize,
        member_id:this.props.id,
        type:this.state.bigPanelActiveIndex
      })
      .then(res => {
        this.setState({
          teamList: res.data.items,
          teamListLoading: false,
        })
        return res.data.total
      })
      .catch(err => {
        this.setState({
          teamListLoading: false,
        })
      })
  }
  tooglePanel = (it,index) => {
    let { key } = this.state
    this.setState({
      bigPanelActiveIndex: index,
      key:key+1
    })
  }
  showWayChange=(e)=>{
    // console.log(e.target.value)
    this.setState({
        showWay:e.target.value
    })
  }
  render() {
    const { getTeamList, tooglePanel,showWayChange } = this
    const { teamList, teamListLoading, bigPanelActiveIndex,teamInfo,key,showWay } = this.state
    const { id } = this.props
    return (
      <div>
        <div className={styles.bigPanelBox}>
          <Row gutter={16}>
            {ToogleTeamList({activeIndex:bigPanelActiveIndex,teamInfo}).map((it, i) => (
              <BigPanel
                key={i}
                index={i}
                onClick={i => {
                  tooglePanel(it,i)
                }}
                {...it}
              />
            ))}
          </Row>
        </div>
        <div className={styles.toogleBtnBox}>
          <Radio.Group onChange={showWayChange} defaultValue={showWay} buttonStyle="solid">
            <Radio.Button value="table">表格</Radio.Button>
            <Radio.Button value="chart">图文</Radio.Button>
          </Radio.Group>
        </div>
        <div>
        {
            showWay==='table'?
            <CommonTable
                columns={getColumns.call(this)}
                key={key}
                tableProps={{
                pagination: true,
                }}
                loading={teamListLoading}
                dataSource={teamList}
                getList={getTeamList}
            />
            :
            <TeamListChart id={id}></TeamListChart>
        }
        </div>
        
      </div>
    )
  }
}

export const BigPanel = ({
  title,
  num,
  span,
  color,
  active,
  onClick,
  index,
}) => {
  return (
    <Col span={span}>
      <div
        className={styles.bigPanel}
        onClick={() => {
          onClick(index)
        }}
        style={{ border: active ? `2px solid ${color}` : '2px solid #ededed' }}
      >
        <div className={styles.bigPanelTitle}>{title}</div>
        <div style={{ color: color }} className={styles.bigPanelNum}>
          {num}
        </div>
      </div>
    </Col>
  )
}

export default TeamList
