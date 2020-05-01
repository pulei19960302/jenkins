export default function () {
    return {
        color: ['#35C8CD', '#FFAAAA'],
        legend: {
            data: ['嘻嘻', '呵呵'],
            selectedMode: false,
            left: '6%',
            textStyle: {
                color: '#666',
                fontSize: 14,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#000',
                    opacity: 0.65,
                },
            },
            show: true,
            padding: 10,
        },
        grid: {
            //   top: 40,
            //   right: 50,
            //   bottom: 30,
        },

        xAxis: {
            type: 'category',
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#999',
                // interval: Math.floor(list.length / 6),
            },
            axisLine: {
                lineStyle: {
                    color: '#E9E9E9',
                },
            },
            data: ['2020-02-01', '2020-02-02', '2020-02-03', '2020-02-04', '2020-02-05', '2020-02-06', '2020-02-07', '2020-02-08', '2020-02-09', '2020-02-10', '2020-02-11', '2020-02-12', '2020-02-13', '2020-02-14']
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            type: 'value',
            axisLine: {
                show: false,
            },
            axisLabel: {
                // formatter: '{value}',
                color: '#666',
                fontSize: 14,
            },
        },
        series: [
            {
                name: '嘻嘻',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                data: [220, 182, 191, 234, 290, 100, 50, 300, 20, 150, 232, 201, 154, 190],
                lineStyle: {
                    
                },
            },
            {
                name: '呵呵',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                data: [120, 132, 101, 134, 90, 230, 210, 320, 332, 301, 334, 390, 330, 320],
                lineStyle: {
                    
                },
            },
        ],
    }
}
