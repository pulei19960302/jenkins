import React, { PureComponent } from 'react'
import styles from './index.less'
import draw from './draw'
import { Alert } from 'antd'
class TeamListChart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      showAlert: false
    }
  }
  async componentDidMount() {
    draw(this.props.id, document.querySelector("#user_relation_chart_container").clientWidth)
      .then(() => {
        this.setState({ showAlert: true })
      })
  }
  render() {
    return (
      <div className={styles.container}>
        <div id="user_relation_chart_container" className={styles.canvasWrapper}></div>
        {
          this.state.showAlert && <Alert message="小提示：按住上方框内空白处可以拖动呢！" type="info" showIcon />
        }
      </div>
    )
  }
}

export default TeamListChart
