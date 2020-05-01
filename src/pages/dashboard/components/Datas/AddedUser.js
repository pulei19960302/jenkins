import ReactEcharts from 'echarts-for-react'
import React, { PureComponent } from 'react'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { IconFont } from 'components'
import styles from '../../index.less'


const options = {
  grid: {
    top: '40',
    right: 0,
    bottom: 0,
    left: 0,
    height: '60',
  },
  xAxis: {
    show: false,
    data: ['衣服', '裤儿', '孩儿', '绿帽', '大', '小猪', '蜀水', '1', '66'],
  },
  yAxis: {
    show: false,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: [10, 10, 10, 6],
    borderRadius: '3px',
    axisPointer: {
      type: 'none',
    },
    textStyle: {
      color: 'rgba(0,0,0,0.45)',
    },
    formatter: `<span style="display:inline-block;margin-right:5px;border-radius:10px;
    width:10px;height:10px;background-color:rgb(223, 199, 248);"></span>
    {b0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}`,
    extraCssText: 'border-radius: 3px; box-shadow: rgb(174, 174, 174) 0px 0px 10px;',
  },
  series: [
    {
      type: 'bar',
      barMaxWidth: 10,
      data: [220, 182, 191, 234, 290, 100, 50, 300, 20],
      itemStyle: { color: 'rgb(223, 199, 248)' },
      emphasis: { itemStyle: { color: 'rgb(223, 199, 248)' } },
      cursor: 'default',
    },
  ],
}

class AddedUser extends PureComponent {
  renderTop() {
    return (
      <Row className={`${styles.chartTop} dpflex`}>
        <Col span={12}>
          <span className={styles.chartTitle}>今日新增用户</span>
          <QuestionCircleFilled style={{ color: '#B3BBBF' }} />
          <span className={`${styles.chartNum} ${styles.colorDark}`}>273</span>
        </Col>
        <Col span={6}>近30日新增用户</Col>
        <Col span={6}>
          <div className={styles.chartIcon}>
            <IconFont type="iconxinzengyonghu" />
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    return(
      <div className={styles.addedUser}>
        {this.renderTop()}
        <ReactEcharts
          option={options}
          style={{ width: '100%', height: '100px' }}
        />
      </div>
    )
  }
}

export default AddedUser