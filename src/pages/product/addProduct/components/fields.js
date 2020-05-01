import { Input, InputNumber } from 'antd'
import { PreviewImg } from 'components'
import UploadAttrImg from './UploadAttrImg'

export const getColumns = function (rebateConfig) {
    const getRebateColumns = (rebateConfig) => { // 根据配置获取返利 column 配置
        let distColumns = [
            {
                title: '价格(元)',
                children: [{
                    title: '销售价',
                    dataIndex: 'shop_price',
                    width: 100,
                    render: (value, record, index) => {
                        return (
                            <InputNumber min={0} style={{ width: '100%' }} value={value} onChange={(val) => { this.handleTableFieldChange('shop_price', record, val) }} />
                        )
                    }
                },
                {
                    title: '成本价',
                    dataIndex: 'cost_price',
                    width: 100,
                    render: (value, record, index) => {
                        return (
                            <InputNumber min={0} style={{ width: '100%' }} value={value} onChange={(val) => { this.handleTableFieldChange('cost_price', record, val) }} />
                        )
                    }
                }],
            },
        ]
        if (rebateConfig === null) { return distColumns }
        if (rebateConfig.sell_prices.length !== 0) { // 经销价, sell_prices_
            distColumns.push({
                title: '经销价(元)',
                children: rebateConfig.sell_prices.map((item) => {
                    const { id, name } = item
                    const dataIndexStr = `sell_prices_${id}`
                    return {
                        title: name,
                        dataIndex: dataIndexStr,
                        width: 100,
                        render: (value, record, index) => {
                            return (
                                <Input style={{ width: '100%' }} value={value} onChange={(e) => { this.handleTableFieldChange(dataIndexStr, record, e.target.value) }} />
                            )
                        }
                    }
                })
            })
        }
        if (rebateConfig.agencies.length !== 0) { // 代理佣金, agency_commissions_
            distColumns.push({
                title: '代理佣金(元)',
                children: rebateConfig.agencies.map((item) => {
                    const { id, name } = item
                    const dataIndexStr = `agency_commissions_${id}`
                    return {
                        title: name,
                        dataIndex: dataIndexStr,
                        width: 110,
                        render: (value, record, index) => {
                            return (
                                <Input style={{ width: '100%' }} value={value} onChange={(e) => { this.handleTableFieldChange(dataIndexStr, record, e.target.value) }} />
                            )
                        }
                    }
                })
            })
        }
        if (rebateConfig.distributions.length !== 0) { // 分销佣金, distribution_commissions_
            distColumns.push({
                title: '分销佣金(元)',
                children: rebateConfig.distributions.map((item) => {
                    const { id, name } = item
                    const dataIndexStr = `distribution_commissions_${id}`
                    return {
                        title: name,
                        dataIndex: dataIndexStr,
                        width: 110,
                        render: (value, record, index) => {
                            return (
                                <Input style={{ width: '100%' }} value={value} onChange={(e) => { this.handleTableFieldChange(dataIndexStr, record, e.target.value) }} />
                            )
                        }
                    }
                })
            })
        }
        if (rebateConfig.teams) { // 团队分红, team_commission
            distColumns.push({
                title: '团队分红(元)',
                dataIndex: 'team_commission',
                width: 128,
                render: (value, record, index) => {
                    return (
                        <Input style={{ width: '100%' }} value={value} onChange={(e) => { this.handleTableFieldChange('team_commission', record, e.target.value) }} />
                    )
                }
            })
        }
        return distColumns
    }

    const baseColumns = [
        {
            // title: `规格${specsColumn.join('-')}`,
            title: '规格',
            dataIndex: 'specs_name',
            width: 200,
            fixed: 'left'
        },
        {
            title: '库存',
            dataIndex: 'stock',
            width: 148,
            fixed: 'left',
            render: (value, record, index) => {
                return (
                    <InputNumber min={0} style={{ width: '100%' }} value={value} onChange={(val) => this.handleTableFieldChange('stock', record, val)} />
                )
            }
        },
        {
            title: 'SKU编码',
            dataIndex: 'sku_code',
            width: 148,
            fixed: 'left',
            render: (value, record, index) => {
                return (
                    <Input disabled={record.sku_id!==-1} style={{ width: '100%' }} value={value} onChange={(e) => this.handleTableFieldChange('sku_code', record, e.target.value)} />
                )
            }
        },
        {
            title: 'SKU图片',
            dataIndex: 'sku_img',
            width: 88,
            fixed: 'left',
            render: (value) => {
                return (
                    value ?
                        <img
                            src={value}
                            style={{ marginLeft: 5, width: 40, height: 40, borderRadius: 3, cursor: 'pointer' }}
                            onClick={() => { PreviewImg({ imgUrl: value }) }}
                        /> : null
                )
            }
        },

    ]
    const operateColumns = [
        {
            title: '操作',
            dataIndex: 'operation',
            width: 90,
            fixed: 'left',
            render: (value, record, index) => {
                return (
                    <div>
                        <UploadAttrImg uploadSuccess={(url) => this.handleTableFieldChange('sku_img', record, url)}>
                            <a>
                                {record.sku_img ? '重传图片' : '上传图片'}
                            </a>
                        </UploadAttrImg>
                        <a onClick={() => this.handleCountRebate(record)} style={{ display: 'block' }}>返利计算</a>
                        <a onClick={() => this.handleClearTableRow(record)} style={{ display: 'block' }}>清除数据</a>
                    </div>
                )
            }
        }
    ]
    const priceColumns = getRebateColumns(rebateConfig)
    return [...baseColumns, ...operateColumns, ...priceColumns,]
}

export const getAllColumnsWidth = (rebateConfig) => {
    const columns = getColumns(rebateConfig)
    let count = 0
    columns.forEach((column) => {
        if (column.children) {
            column.children.forEach((child) => { count += child.width })
        } else {
            count += column.width
        }
    })
    return count
}