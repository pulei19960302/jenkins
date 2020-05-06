import React, { PureComponent, Fragment } from 'react'
import { Page, PageTitle, FSwitch } from 'components'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Switch, Select, Button, Row, Col, InputNumber, Card, Message } from 'antd';
import RebatePattern, { getPatternItems } from './rebatePattern'
import UpgradeCondition from './upgradeCondition'
import { createUUID } from 'utils'
const FormItem = Form.Item

@Form.create()
class UserLevelSet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      conditionItems: [],
      patternItems: [],
      loading: false,
      is_auto: 0,

      rebateConfigs: []
    }
  }
  componentDidMount() {
    const id = this.props.history.location.query.id
    const sort = this.props.history.location.query.sort
    if (id !== undefined) {
      $api.user.userLevelDetail({ id }).then(res => {
        console.log("datadatadatadatadatadata", res.data)
        const { sort, name, rebate_configs } = res.data
        const { data } = res.data
        const { upgrade, rebate } = data
        const { is_auto, is_verify } = upgrade
        const { form } = this.props
        setTimeout(() => {
          form.setFieldsValue({ sort, name, is_auto, is_verify })
        }, 0)

        const patternItems = rebate.rule.reduce((a, b) => {
          let c = []
          Object.keys(b).forEach(it => {
            if (rebate_configs[it]) {
              c.push(getPatternItems(it))
            }
          })

          return c.length > 0 && a.push(c), a
        }, [])

        const conditionItems = upgrade.rule.reduce((a, b) => {
          a.push(Object.keys(b).map(it => {
            if (it === 'goods_ids') {
              b[it] = b[it].join(',')
            }
            return getPatternItems(it, b[it])
          }))
          return a
        }, [])

        this.setState({
          patternItems, conditionItems, is_auto,
          rebateConfigs: Object.entries(rebate_configs).map(([value, name]) => ({
            name, value,
            uuid: createUUID()
          }))
        })
      }).catch(err => {
        setTimeout(() => {
          this.props.history.replace('/user/userLevel')
        }, 2500)
      })
    }
    if (sort) {
      const { form } = this.props
      setTimeout(() => {
        form.setFieldsValue({ sort })
      }, 0)
    }
  }
  // breakingChange will trigger react re-render
  rebatePatternChange = (key, index1, index2, res = {}) => {
    const patternItems = JSON.parse(JSON.stringify(this.state.patternItems))
    let length = patternItems.flat().length
    let maxLen = this.state.rebateConfigs.length

    switch (key) {
      case 'addPlus':
        if (length < maxLen) {
          patternItems.push(res)
        } else {
          Message.warning('选项数量已达上限');
        }
        break
      case 'add':
        if (length < maxLen) {
          patternItems[index1].push(res)
        } else {
          Message.warning('选项数量已达上限');
        }
        break
      case 'change':
        patternItems[index1].splice(index2, 1, res)
        break
      case 'del':
        if (patternItems[index1].length === 1) {
          patternItems.splice(index1, 1)
        } else {
          patternItems[index1].splice(index2, 1)
        }
        break
    }

    this.setState({
      patternItems
    })

    console.log("patternItems", patternItems)

  }
  upgradeConditionChange = (key, index1, index2, res = {}) => {
    const conditionItems = JSON.parse(JSON.stringify(this.state.conditionItems))
    switch (key) {
      case 'addPlus':
        conditionItems.push(res)
        break
      case 'add':
        conditionItems[index1].push(res)
        break
      case 'change':
        conditionItems[index1].splice(index2, 1, res)
        break
      case 'del':
        if (conditionItems[index1].length === 1) {
          conditionItems.splice(index1, 1)
        } else {
          conditionItems[index1].splice(index2, 1)
        }
        break
    }
    console.log(conditionItems)
    this.setState({
      conditionItems,
    })
  }
  toogleLoading = (loading) => {
    this.setState({
      loading
    })
  }
  submit = () => {
    const { form } = this.props
    let { conditionItems, patternItems } = this.state
    const id = this.props.history.location.query.id
    conditionItems = JSON.parse(JSON.stringify(conditionItems))
    form.validateFields(async (err, values) => {
      if (!err) {
        const { name, sort, is_verify, is_auto } = values
        const params = {
          name,
          sort,
          data: {
            upgrade: {
              is_verify,
              is_auto,
              rule: conditionItems.map(it => {
                const result = {}
                it.forEach(item => {
                  if (item.value) {
                    if (item.value === 'goods_ids') {
                      item.params = item.params.split(',')
                    }
                    result[item.value] = item.params === '' ? '' : +item.params
                  }
                })
                return result
              }).filter(it => JSON.stringify(it) !== "{}")
            },
            rebate: {
              rule: patternItems.map(it => {
                const result = {}
                it.forEach(item => {
                  if (item.value) {
                    result[item.value] = 1
                  }
                })
                return result
              }).filter(it => JSON.stringify(it) !== "{}")
            }
          }
        }
        if (id !== undefined) {
          await $api.user.editLevel({ id, ...params }, { success: true, loadingFn: this.toogleLoading })
        } else {
          await $api.user.addLevel(params, { success: true, loadingFn: this.toogleLoading })
          $api.user.userLevelList({}, { cache: true, cacheFresh: true })
        }
        this.props.history.goBack()
      }
    })
  }
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { rebatePatternChange, upgradeConditionChange, submit } = this
    const { conditionItems, patternItems, loading, rebateConfigs } = this.state
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 },
    }
    const simpleRule = { rules: [{ required: true, message: '请填写' }] }
    return (
      <Page inner style={{ background: 'inherit', padding: 0 }}>
        <Form {...formItemLayout}>
          <Card style={{ marginBottom: 16 }}>
            <PageTitle title="基本信息" />

            <FormItem label="等级">
              {getFieldDecorator('sort', simpleRule)(
                <InputNumber disabled style={{ width: '100%' }} placeholder="请输入" />
              )}
            </FormItem>

            <FormItem label="等级名称">
              {getFieldDecorator('name', simpleRule)(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <PageTitle title="晋升机制"></PageTitle>
            <FormItem label="是否自动升级">
              {getFieldDecorator('is_auto', {
                initialValue: 0
              })(
                <FSwitch onChange={e => {
                  this.setState({
                    is_auto: e
                  })
                }}></FSwitch>
              )}
            </FormItem>
            {
              !!this.state.is_auto &&
              <Fragment>
                <FormItem label="是否需要审核">
                  {getFieldDecorator('is_verify', {
                    initialValue: 0
                  })(
                    <FSwitch></FSwitch>
                  )}
                </FormItem>
                <UpgradeCondition
                  conditionItems={conditionItems}
                  upgradeConditionChange={upgradeConditionChange}
                ></UpgradeCondition>
              </Fragment>
            }
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <PageTitle title="返利模式" />
            <RebatePattern
              patternItems={patternItems}
              rebatePatternChange={rebatePatternChange}
              rebateConfigs={rebateConfigs}
            ></RebatePattern>
          </Card>
        </Form>


        <Row type="flex" justify="center">
          <Button onClick={submit} loading={loading} type="primary">
            提交
          </Button>
        </Row>

      </Page>
    )
  }
}

export default UserLevelSet
