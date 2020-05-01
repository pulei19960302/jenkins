import ReactEcharts from 'echarts-for-react'
import React, { PureComponent } from 'react'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { IconFont } from 'components'
import styles from '../../index.less'

const options = {
  grid: {
    top: '35',
    right: 0,
    bottom: 0,
    left: 0,
    height: '60',
  },
  color: ['#1890FF'],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: [10,10,10,6],
    borderRadius: '3px',
    axisPointer: {
      type: 'none',
    },
    textStyle: {
      color: 'rgba(0,0,0,0.45)',
    },
    formatter: `<span style="display:inline-block;margin-right:5px;border-radius:10px;
    width:10px;height:10px;background-color:#1890FF;"></span>
    {b0}&nbsp;&nbsp;&nbsp;&nbsp;{c0}`,
    extraCssText: 'border-radius: 3px; box-shadow: rgb(174, 174, 174) 0px 0px 10px;',
  },
  xAxis: {
    show: false,
    data: ['2020-02-01', '2020-02-02', '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13', '2020-02-14']
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 6,
      cursor: 'default',
      data: [220, 182, 191, 234, 290, 100, 50, 300, 20, 150, 232, 201, 154, 190],
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#1890FF' // 0% 处的颜色
          }, {
            offset: 1, color: '#E6F7FF' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      },
    },
  ],
}

class Orders extends PureComponent {
  renderTop() {
    return (
      <Row className={`${styles.chartTop} dpflex`}>
        <Col span={12}>
          <span className={styles.chartTitle}>今日订单数</span>
          <QuestionCircleFilled style={{ color: '#B3BBBF' }} />
          <span className={`${styles.chartNum} ${styles.colorDark}`}>1290</span>
        </Col>
        <Col span={6}>近30日订单数量</Col>
        <Col span={6}>
          <div className={styles.chartIcon}>
            <IconFont type="icondingdanshu" />
          </div>
        </Col>
      </Row>
    );
  }
  render() {
    return (
      <div className={styles.orders}>
        {this.renderTop()}
        <ReactEcharts
          option={options}
          style={{ width: '100%', height: '100px' }}
        />
      </div>
    )
  }
}

export default Orders