import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { createUUID } from 'utils'
import { Form, Row, Col, Input, Checkbox, Tag, message } from 'antd'
import ChooseSpecs from './ChooseSpecs'
import { getCheckOptions } from './utils'

const { Search } = Input

@connect(({ addProduct }) => ({ ...addProduct }))
class SpecsInfo extends PureComponent {
    state = {
        rebateConfig: null,
        searchVal: {}
    }
    componentDidMount() {

    }
    searchChange = (key, value) => {
        const { searchVal } = this.state
        this.setState({
            searchVal: {
                ...searchVal,
                [key]: value
            }
        })
    }
    specsListChange = (list, value) => {
        const nextSelect = list.filter(el => value.includes(el.attr_item_id))
        const prveSelect = this.props.selectSpecs
        const newSelect = nextSelect.map(el => {
            const specs = prveSelect.find(specs => specs.attr_item_id === el.attr_item_id)
            return specs || el
        })
        const selectSpecs = _.cloneDeep(newSelect)
        this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    getTags = (el) => {
        const { values = [], value = [] } = el
        const selectSpecsValue = values.filter(specsValue => (value.includes(specsValue.attr_value_id) || !specsValue.attr_value_id))
        return selectSpecsValue.map(it =>
            <Tag
                color="cyan"
                key={it.attr_item_value}
                onClose={(e) => { e.preventDefault(); this.handleTagClose(el, it) }} closable className="specTag"
            >
                {it.attr_item_value}
            </Tag>
        )
    }
    handleTagClose = (el, it) => {
        const selectSpecs = _.clone(this.props.selectSpecs)
        const specs = selectSpecs.find(it => el.attr_item_id === it.attr_item_id)
        const { values = [], value = [] } = specs
        if (it.attr_value_id) {
            specs.value = value.filter(id => id !== it.attr_value_id)
            this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        } else {
            specs.values = values.filter(el => el.attr_item_value !== it.attr_item_value)
            this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        }
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    addSpecsValue = (el, val) => {
        if (!val) { return }
        const selectSpecs = _.clone(this.props.selectSpecs)
        const specs = selectSpecs.find(it => el.attr_item_id === it.attr_item_id)
        const { values = [], value = [] } = specs
        const selectSpecsValue = values.filter(specsValue => (value.includes(specsValue.attr_value_id) || !specsValue.attr_value_id)) || []
        console.log(selectSpecsValue, val)
        if (selectSpecsValue.find(el => el.attr_item_value === val)) {
            message.warn("规格值不能重复")
            return
        } else if (values.find(el => el.attr_item_value === val)) {
            specs.value = [...value, values.find(el => el.attr_item_value === val).attr_value_id]
            this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        } else {
            specs.values = [...values, { attr_item_value: val }]
            this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        }
        this.searchChange(el.attr_item_id, "")
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    checkboxChange = (el, value) => {
        const selectSpecs = _.clone(this.props.selectSpecs)
        const specs = selectSpecs.find(it => el.attr_item_id === it.attr_item_id)
        specs.value = value
        this.props.dispatch({ type: 'addProduct/updateState', payload: { selectSpecs } })
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    AddCustomSpec = () => {
        const customSpecs = [...this.props.customSpecs, { id: createUUID(), name: '', values: [] }]
        this.props.dispatch({ type: 'addProduct/updateState', payload: { customSpecs } })
    }
    removeCustomSpec = (el) => {
        const customSpecs = this.props.customSpecs.filter(specs => el.id !== specs.id)
        this.props.dispatch({ type: 'addProduct/updateState', payload: { customSpecs } })
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    handleSpecNameChange = (el, name) => {
        const customSpecs = _.clone(this.props.customSpecs)
        const specs = customSpecs.find(it => el.id === it.id)
        specs.name = name
        this.props.dispatch({ type: 'addProduct/updateState', payload: { customSpecs } })
    }
    addCustomSpecsValue = (el, val, target) => {
        if (!val) { return }
        const customSpecs = _.clone(this.props.customSpecs)
        const specs = customSpecs.find(it => el.id === it.id)
        const { values = [] } = specs
        if (values.find(el => el.attr_item_value === val)) {
            message.warn("规格值不能重复")
            return
        } else {
            specs.values = [...values, { attr_item_value: val }]
            this.props.dispatch({ type: 'addProduct/updateState', payload: { customSpecs } })
            this.searchChange(el.id, "")
        }
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    getCustomTags = (el) => {
        const { values = [] } = el
        return values.map(it =>
            <Tag
                color="cyan"
                key={it.attr_item_value}
                onClose={(e) => { e.preventDefault(); this.handCustomleTagClose(el, it) }} closable className="specTag"
            >
                {it.attr_item_value}
            </Tag>
        )
    }
    handCustomleTagClose = (el, it) => {
        const customSpecs = _.clone(this.props.customSpecs)
        const specs = customSpecs.find(it => el.id === it.id)
        const { values = [] } = specs
        specs.values = values.filter(el => el.attr_item_value !== it.attr_item_value)
        this.props.dispatch({ type: 'addProduct/updateState', payload: { customSpecs } })
        this.props.dispatch({ type: 'addProduct/getDataSource' })
    }
    render() {
        const { searchVal } = this.state
        const { selectSpecs, customSpecs } = this.props
        return (
            <Fragment>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="模板规格"
                        >
                            <ChooseSpecs onChange={this.specsListChange} />
                        </Form.Item>
                    </Col>
                </Row>
                {
                    selectSpecs.map(el =>
                        <Row className="specContainer" key={el.attr_item_id}>
                            <Col span={2}>
                                <span className="fieldLabel">{el.name}：</span>
                            </Col>
                            <Col span={22}>
                                {this.getTags(el)}
                                <Search
                                    value={searchVal[el.attr_item_id]}
                                    onChange={(e) => this.searchChange(el.attr_item_id, e.target.value)}
                                    style={{ width: 200 }}
                                    placeholder="请输入规格值"
                                    enterButton="添加"
                                    onSearch={(value) => this.addSpecsValue(el, value)}
                                />
                                <div className="specCheckBoxArea">
                                    <Checkbox.Group
                                        value={el.value}
                                        onChange={(value) => this.checkboxChange(el, value)}
                                        options={getCheckOptions(el.values)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    )
                }
                {
                    customSpecs.map(el =>
                        <Row className="specContainer" key={el.id}>
                            <Col span={2} className="fieldLabel" style={{ paddingRight: 8 }}>
                                <Input placeholder="规格名" value={el.name} onChange={e => { this.handleSpecNameChange(el, e.target.value) }} />
                            </Col>
                            <Col span={22}>
                                {this.getCustomTags(el)}
                                <Search
                                    value={searchVal[el.id]}
                                    onChange={(e) => this.searchChange(el.id, e.target.value)}
                                    style={{ width: 200 }}
                                    placeholder="请输入规格值"
                                    enterButton="添加"
                                    onSearch={(value) => this.addCustomSpecsValue(el, value)}
                                />
                                <a onClick={() => this.removeCustomSpec(el)} style={{ marginLeft: 12 }}>移除此规格</a>
                            </Col>
                        </Row>
                    )
                }
                <Row>
                    <Col offset={2} className="addSpecBtn">
                        <a onClick={this.AddCustomSpec}>+ 添加规格</a>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default SpecsInfo
