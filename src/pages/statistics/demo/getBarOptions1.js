import echarts from 'echarts'

export default function() {
  return {
    title: {
      show: false,
      text: 'demo',
    },
    backgroundColor: '#F3F9FF',
    xAxis: {
      data: ['外套', '衬衫', '夹克', 'T恤', '风衣', '羽绒服', '牛仔', '大衣', '毛绒'],
      axisLabel: {
        textStyle: {
          color: '#000000',
        },
        howMinLabel: true,
        fontSize: 12,
        rotate: 70,
      },
      // 刻度
      axisTick: {
        show: false,
      },
      // 轴线
      axisLine: {
        show: true,
        lineStyle: {
          color: '#91CFFF',
        },
      },
      z: 0,
    },
    yAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#91CFFF',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#000000',
        },
      },
      splitLine: { lineStyle: { type: 'dashed' } },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: '#35C3FF' },
            { offset: 0, color: '#1890FF' },
          ]),
        },
      },
      show: true,
      padding: 10,
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 30,
        itemStyle: {
          normal: {
            barBorderRadius: [4, 4, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#35C3FF' },
              { offset: 1, color: '#1890FF' },
            ]),
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#639EFF' },
              { offset: 1, color: '#639EFF' },
            ]),
          },
        },
        data: [220, 182, 191, 234, 290, 100, 50, 300, 20],
      },
    ],
  }
}
