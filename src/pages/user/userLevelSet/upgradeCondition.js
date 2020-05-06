import React, { PureComponent, Fragment } from 'react'
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Button, Row, Col } from 'antd';
import { createUUID } from 'utils'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option

const CONDITIONS = [
  { value: 'directly_users', name: '直属人数满' },
  { value: 'expenditure', name: '消费金额满' },
  { value: 'goods_ids', name: '购买指定商品' },
  { value: 'integral', name: '积分满' },
]
const PLACE_HOLDERS = {
  directly_users: '请输入人数',
  expenditure: '请输入金额',
  goods_ids: '请输入商品ID',
  integral: '请输入积分'
}
const getConditionItems = function (value, params = '') {
  return {
    value,
    params,
    uuid: createUUID(),
  }
}

class UpgradeCondition extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { upgradeConditionChange, conditionItems } = this.props
    return (
      <Fragment>
        <FormItem label="升级条件" wrapperCol={{ span: 21 }}>
          <div>
            {conditionItems.map((it, index1, arr) => (
              <Fragment key={it[0].uuid}>
                <Row className={styles.conditionsItem} style={{ position: 'relative' }} type="flex" align="middle" key={it[0].uuid}>
                  {
                    it.map((item, index2, arr) => (
                      <GenerateConditionItem
                        key={item.uuid}
                        item={item}
                        upgradeConditionChange={upgradeConditionChange}
                        index1={index1}
                        index2={index2}
                        length={arr.length}
                      />
                    ))
                  }
                </Row>
                {index1 !== arr.length - 1 && <div>或</div>}
              </Fragment>
            ))}
            <Button onClick={() => { upgradeConditionChange('addPlus', null, null, [getConditionItems()]) }} type="link" icon={<PlusOutlined />}>添加条件</Button>
          </div>
        </FormItem>
      </Fragment>
    );
  }
}

const GenerateConditionItem = function ({
  upgradeConditionChange,
  index1,
  index2,
  item,
  length
}) {
  const conditionChange = e => {
    upgradeConditionChange('change', index1, index2, {
      ...item,
      value: e,
    })
  }
  const inputChange = e => {
    upgradeConditionChange('change', index1, index2, {
      ...item,
      params: e.target.value,
    })
  }
  const onDel = _ => {
    upgradeConditionChange('del', index1, index2, null)
  }
  const onAdd = _ => {
    upgradeConditionChange('add', index1, null, getConditionItems())
  }
  return (
    <Fragment>
      {index2 !== 0 && <span style={{ margin: '0 10px' }}>且</span>}
      <Select
        onChange={conditionChange}
        placeholder="请选择升级条件"
        defaultValue={item.value}
        style={{ width: 150, marginRight: 10 }}
      >
        {GenerateConditions()}
      </Select>
      <div style={{ width: '100px', position: 'relative' }}>
        <Input defaultValue={item.params} type="number" placeholder={PLACE_HOLDERS[item.value]} onChange={inputChange} />
        <CloseCircleFilled
          onClick={onDel}
          style={{ cursor: 'pointer', position: 'absolute', right: -6, top: -2 }}></CloseCircleFilled>
      </div>
      {
        index2 === length - 1 && <Button style={{ padding: '0 10px', marginLeft: 5 }} onClick={onAdd} type="link">添加</Button>
      }
    </Fragment>
  );
}

const GenerateConditions = function () {
  return CONDITIONS.map(it => (
    <Option key={it.value} value={it.value}>
      {it.name}
    </Option>
  ))
}

export default UpgradeCondition
