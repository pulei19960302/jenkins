import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { Row, Col, Input, Checkbox, Popover, Button, Table, message } from 'antd'
import { getColumns, getAllColumnsWidth } from './fields'
import styles from '../index.less'

@connect(({ addProduct }) => ({ ...addProduct }))
class SpecsInfo extends PureComponent {
    state = {
        rebateConfig: null,
        multiUseChecked: [],
        multiUse: {

        }
    }
    componentDidMount() {
        $api.product.productRebateConfig().then((res) => {
            this.setState({
                rebateConfig: res.data,
            })
            const tempTableObj = {
                stock: 0,
                shop_price: "",
                cost_price: "",
                sku_code: '',
                sku_img: ''
            }
            const { sell_prices, agencies, distributions, teams } = res.data
            if (sell_prices && sell_prices.length) {
                sell_prices.forEach(el => {
                    tempTableObj[`sell_prices_${el.id}`] = ""
                })
            }
            if (agencies && agencies.length) {
                agencies.forEach(el => {
                    tempTableObj[`agency_commissions_${el.id}`] = ""
                })
            }
            if (distributions && distributions.length) {
                distributions.forEach(el => {
                    tempTableObj[`distribution_commissions_${el.id}`] = ""
                })
            }
            if (teams) { tempTableObj['team_commission'] = "" }
            this.props.dispatch({ type: 'addProduct/updateState', payload: { tempTableObj } }) //初始化table默认字段
        })
    }
    handleMultiUseChange = (val, key) => {
        const { multiUse } = this.state
        this.setState({
            multiUse: {
                ...multiUse,
                [key]: val
            }
        })
    }
    handleAllCheckUseTo = () => {
        const { dataSource } = this.props
        const { multiUseChecked } = this.state
        if (multiUseChecked.length >= dataSource.length) {
            this.setState({ multiUseChecked: [] })
        } else {
            const multiUseChecked = dataSource.map(el => el.specs_name)
            this.setState({ multiUseChecked })
        }
    }
    handleMultiUseTo = () => {
        const { multiUseChecked } = this.state
        const { multiUse } = this.state
        const tempUse = {}
        for (let key in multiUse) {
            if (multiUse[key]) {
                tempUse[key] = multiUse[key]
            }
        }
        const { dataSource } = this.props
        const newData = dataSource.map(el => {
            if (multiUseChecked.includes(el.specs_name)) {
                return {
                    ...el,
                    ...tempUse
                }
            } else {
                return el
            }
        })
        this.props.dispatch({ type: 'addProduct/updateState', payload: { dataSource: newData } })
    }
    handleTableFieldChange = (key, el, val) => {
        const dataSource = _.clone(this.props.dataSource)
        const data = dataSource.find(it => it.specs_name === el.specs_name)
        data[key] = val
        this.props.dispatch({ type: 'addProduct/updateState', payload: { dataSource } })
    }
    handleClearTableRow = (el) => {
        const dataSource = _.clone(this.props.dataSource)
        const data = dataSource.find(it => it.specs_name === el.specs_name)
        for (let key in data) {
            if (!['specs_name', 'specs_key', 'sku_img', 'sku_id'].includes(key)) {
                data[key] = ""
            }
        }
        this.props.dispatch({ type: 'addProduct/updateState', payload: { dataSource } })
    }
    handleCountRebate = (el) => {
        const { rebateConfig } = this.state
        if (!rebateConfig) return
        const shop_price = Number(el.shop_price || "")
        if (!shop_price) {
            message.info('请填写商品销售价！')
            return
        }
        const { agencies, distributions, teams } = rebateConfig
        const dataSource = _.clone(this.props.dataSource)
        const data = dataSource.find(it => it.specs_name === el.specs_name)
        if (agencies && agencies.length) {
            agencies.forEach(el => {
                const { id, money } = el
                data[`agency_commissions_${id}`] = (money / 100 * shop_price).toFixed(2)
            })
        }
        if (distributions && distributions.length) {
            distributions.forEach(el => {
                const { id, money } = el
                data[`distribution_commissions_${id}`] = (money / 100 * shop_price).toFixed(2)
            });
        }
        if (teams) {
            data['team_commission'] = teams.money
        }
        this.props.dispatch({ type: 'addProduct/updateState', payload: { dataSource } })
    }
    renderMuitiDynamicField = () => {
        const { rebateConfig } = this.state
        if (rebateConfig === null) { return null }
        let { sell_prices, agencies, distributions, teams } = rebateConfig
        return (
            <Fragment>
                {
                    sell_prices && sell_prices.map(el =>
                        <Input
                            key={el.id}
                            placeholder={el.name}
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, `sell_prices_${el.id}`) }} className="multiEditField"
                        />)
                }
                {
                    agencies && agencies.map(el =>
                        <Input
                            key={el.id}
                            placeholder={el.name}
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, `agency_commissions_${el.id}`) }} className="multiEditField"
                        />)
                }
                {
                    distributions && distributions.map(el =>
                        <Input
                            key={el.id}
                            placeholder={el.name}
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, `distribution_commissions_${el.id}`) }} className="multiEditField"
                        />)
                }
                {
                    teams &&
                    <Input
                        placeholder="固定分红"
                        onChange={(e) => { this.handleMultiUseChange(e.target.value, 'team_commission') }} className="multiEditField"
                    />
                }
            </Fragment>
        )
    }
    renderMultiUseTo = () => {
        const { multiUseChecked } = this.state
        const { dataSource } = this.props
        const Content = (
            <div className={styles.multiUseWrapper}>
                <Checkbox.Group value={multiUseChecked} className={styles.multiUseGroup} onChange={(checkedValues) => { this.setState({ multiUseChecked: checkedValues }) }}>
                    {dataSource.map(rowData => {
                        const { specs_name } = rowData
                        return (
                            <Row key={specs_name}>
                                <Col span={24}>
                                    <Checkbox value={specs_name}>{specs_name}</Checkbox>
                                </Col>
                            </Row>
                        )
                    })}
                </Checkbox.Group>
                <Button onClick={this.handleAllCheckUseTo} className="mt4" size="small" >全选</Button>
                <Button onClick={this.handleMultiUseTo} className="mt4" size="small" type="primary">确定</Button>
            </div>
        )
        return (
            <Popover content={Content} title="批量填写于" trigger="hover" placement="left" getPopupContainer={triggerNode => triggerNode.parentElement}>
                <Button className="btnGhostPrimary">应用</Button>
            </Popover>
        )
    }
    render() {
        const { rebateConfig } = this.state
        const { dataSource } = this.props
        return (
            <Fragment>
                <Row className="multiEditArea">
                    <Col span={2} className="fieldLabel">批量填写：</Col>
                    <Col span={20}>
                        <Input
                            placeholder="库存"
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, 'stock') }} className="multiEditField" />
                        <Input
                            placeholder="销售价"
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, 'shop_price') }} className="multiEditField" />
                        <Input
                            placeholder="成本价"
                            onChange={(e) => { this.handleMultiUseChange(e.target.value, 'cost_price') }} className="multiEditField" />
                        {this.renderMuitiDynamicField()}
                    </Col>
                    <Col span={2} className="taRight">
                        {this.renderMultiUseTo()}
                    </Col>
                </Row>
                <Table
                    rowKey={(record, index) => index}
                    scroll={{ x: getAllColumnsWidth(rebateConfig) }}
                    columns={getColumns.call(this, rebateConfig)}
                    bordered
                    dataSource={dataSource}
                    pagination={false}
                />
            </Fragment>
        )
    }
}

export default SpecsInfo
