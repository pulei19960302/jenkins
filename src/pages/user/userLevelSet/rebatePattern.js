import React, { PureComponent, Fragment } from 'react'
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Button, Row } from 'antd';
import { createUUID } from 'utils'
import styles from './index.less'
const FormItem = Form.Item
const Option = Select.Option

const PATTERNS = [
  { value: 'distribution', name: '分销佣金' },
  { value: 'team', name: '团队分红' },
  { value: 'agency', name: '经销差价' },
  { value: 'agent', name: '代理佣金' },
]

export const getPatternItems = function (value, params = '') {
  return {
    value,
    params,
    uuid: createUUID(),
  }
}

@Form.create()

class RebatePattern extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { form, rebatePatternChange, patternItems, rebateConfigs } = this.props
    let selecetValueAry = patternItems.flat().map(({ value }) => value)

    return (
      <Fragment>
        <FormItem label="模式选项" wrapperCol={{ span: 21 }}>
          <div>

            {patternItems.map((it, index1, arr) => (
              <Fragment key={it[0].uuid}>
                <Row className={styles.conditionsItem} style={{ position: 'relative' }} type="flex" align="middle" key={it[0].uuid}>
                  {
                    it.map((item, index2, arr) => (
                      <GeneratePatternsItem
                        key={item.uuid}
                        item={item}
                        rebatePatternChange={rebatePatternChange}
                        index1={index1}
                        index2={index2}
                        length={arr.length}
                        selecetValues={selecetValueAry}
                        rebateConfigs={rebateConfigs}
                      />
                    ))
                  }
                </Row>
                {index1 !== arr.length - 1 && <div>或</div>}
              </Fragment>
            ))}
            <Button onClick={() => { rebatePatternChange('addPlus', null, null, [getPatternItems()]) }} type="link" icon={<PlusOutlined />}>添加模式</Button>
          </div>
        </FormItem>
      </Fragment>
    );
  }
}

const GeneratePatternsItem = function ({
  selecetValues,
  rebatePatternChange,
  index1,
  index2,
  item,
  length,
  rebateConfigs
}) {
  const patternChange = e => {
    rebatePatternChange('change', index1, index2, {
      ...item,
      value: e,
    })
  }
  const onDel = _ => {
    rebatePatternChange('del', index1, index2, null)
  }
  const onAdd = _ => {
    rebatePatternChange('add', index1, null, getPatternItems())
  }
  return (
    <Fragment>
      {index2 !== 0 && <span style={{ margin: '0 10px' }}>和</span>}
      <div style={{ width: '150px', position: 'relative' }}>
  
        <Select
          onChange={patternChange}
          placeholder="请选择返利模式"
          defaultValue={item.value}
          style={{ width: 150, marginRight: 10 }}
        >

          {
            rebateConfigs.map(it => (
              <Option key={it.value} value={it.value} disabled={selecetValues.includes(it.value)}>
                {it.name}
              </Option>
            ))

          }

        </Select>
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

export default RebatePattern
