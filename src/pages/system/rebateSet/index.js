import React, { PureComponent, Fragment } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Switch, Select, Button, Row, Col, InputNumber } from 'antd';
import { Page, PageTitle } from 'components'
import PanelTitle from './components/panelTitle'
import DistributionBlock from './components/distributionBlock'
import XSwitch from './components/xSwitch'
import { createUUID } from 'utils'
import styles from './index.less'
const FormItem = Form.Item
const Option = Select.Option

export const getDistributionItem = ({ relation = '1', integral = '', money = '', integral_way = '' }) => {
  return {
    integral,
    uuid: createUUID(),
    money,
    relation: String(relation),
    integral_way
  }
}

const baseDistributionItems = [
  getDistributionItem({ relation: '' }),
  getDistributionItem({}),
  getDistributionItem({}),
]

@Form.create()
class RebateSet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isDistribution: 0, //是否分销
      distributionItems: baseDistributionItems,
      commission_origin: 0,
      agent_inside: 0,
      commission_postpone: 0,

      isProxy: 0, //是否代理
      proxyItems: [
        getDistributionItem({ relation: '' }),
        getDistributionItem({}),
        getDistributionItem({}),
      ],
      proxy_agent_inside: 0,

      isTeam: 0,
      isPrice: 0,

      loading: false,
      id: '',

      // 20200416
      configTeam: {},
      configAgent: {},
      configAgency: {},
      configDistribution: {},

      distbSwitchFusing: 0,
      agentSwitchFusing: 0
    }
  }
  componentDidMount() {
    $api.system.getRebate({}, { loading: true }).then(res => {
      const { data: d } = res
      if (!d) return
      const { commission_origin, agent_inside, commission_postpone, fusing: distbSwitchFusing } = d.distribution
      const { fusing: agentSwitchFusing } = d.agent

      const newState = {
        isDistribution: d.distribution.switch,
        distributionItems: d.distribution.rule.map(it => getDistributionItem({ ...it })).concat(getDistributionItem({})),
        commission_origin,
        agent_inside,
        commission_postpone,
        isProxy: d.agent.switch,
        proxy_agent_inside: d.agent.agent_inside,
        proxyItems: d.agent.rule.map(it => getDistributionItem({ ...it })).concat(getDistributionItem({})),
        isTeam: d.team.switch,
        isPrice: d.agency.switch,
        id: d.id,

        distbSwitchFusing,
        agentSwitchFusing
      }
      this.setState(newState)
      const { money } = d.team
      const { ratio } = d.agency
      const { form } = this.props
      form.setFieldsValue({ money, ratio })
    })

    // 
    $api.system.getRebateShowName({}, { loading: true }).then(({ data: { distribution, agency, agent, team } }) => {
      this.setState({
        configTeam: team,
        configAgent: agent,
        configAgency: agency,
        configDistribution: distribution
      })
    })
  }
  toogleSwitch = (key, res) => {
    this.setState({
      [key]: res,
    })
  }
  submit = () => {
    const {
      isDistribution,
      distributionItems,
      commission_origin,
      agent_inside,
      commission_postpone,
      isProxy,
      proxy_agent_inside,
      proxyItems,
      isTeam,
      isPrice,
      id,
      distbSwitchFusing,
      agentSwitchFusing
    } = this.state
    const { form } = this.props

    form.validateFields((err, values) => {
      if (err) return
      const { money, ratio } = values
      const params = {
        id,
        distribution: {
          switch: isDistribution,
          commission_origin,
          agent_inside,
          commission_postpone,
          fusing: distbSwitchFusing,
          rule: distributionItems.slice(0, distributionItems.length - 1).map(recoed => ({
            ...recoed,
            relation: Number(recoed.relation),
            integral_way: Number(recoed.integral_way)
          })),
        },
        agent: {
          switch: isProxy,
          agent_inside: proxy_agent_inside,
          fusing: agentSwitchFusing,
          rule: proxyItems.slice(0, proxyItems.length - 1).map(recoed => ({
            ...recoed,
            relation: Number(recoed.relation),
            integral_way: Number(recoed.integral_way)
          })),
        },
        team: {
          switch: isTeam,
          money
        },
        agency: {
          switch: isPrice,
          ratio
        }
      }
      console.log(params);
      $api.system.setRebate(params, { success: true, loadingFn: this.toogleLoading }).then()
    })
  }
  toogleLoading = (loading) => {
    this.setState({
      loading
    })
  }
  distributionItemChange = (key, index, res) => {
    const distributionItems = JSON.parse(JSON.stringify(this.state.distributionItems))
    switch (key) {
      case 'del':
        distributionItems.splice(index, 1)
        break
      case 'add':
        distributionItems.push(getDistributionItem({}))
        break
      case 'change':
        distributionItems.splice(index, 1, res)
        break
    }
    this.setState({
      distributionItems,
    })
  }
  proxyItemChange = (key, index, res) => {
    const proxyItems = JSON.parse(JSON.stringify(this.state.proxyItems))
    switch (key) {
      case 'del':
        proxyItems.splice(index, 1)
        break
      case 'add':
        proxyItems.push(getDistributionItem({}))
        break
      case 'change':
        proxyItems.splice(index, 1, res)
        break
    }
    this.setState({
      proxyItems,
    })
  }
  render = () => {
    const {
      isDistribution,
      distributionItems,
      commission_origin,
      agent_inside,
      commission_postpone,
      isProxy,
      proxyItems,
      proxy_agent_inside,
      isTeam,
      isPrice,
      loading,
      configTeam,
      configAgent,
      configAgency,
      configDistribution,

      distbSwitchFusing,
      agentSwitchFusing
    } = this.state
    const { toogleSwitch, distributionItemChange, proxyItemChange, submit } = this
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Page inner style={{ padding: 0, backgroundColor: 'inherit' }}>
        {/* <PageTitle></PageTitle> */}
        <div className={styles.pageBlockContainer}>
          {/* 分销佣金 */}
          <PanelTitle
            onChange={e => {
              toogleSwitch('isDistribution', e)
            }}
            defaultChecked={isDistribution}
            title={configDistribution.name}
            help={configDistribution.tips}
            desc={[`，产生${configDistribution.name}`, `，不产生${configDistribution.name}`]}
          />

          {isDistribution === 1 && (
            <div className={`${styles.panelContainer} animated fadeIn`}>
              <div className={styles.blockContainer}>
                {distributionItems.map((it, index, arr) => (
                  <DistributionBlock
                    key={it.uuid}
                    item={it}
                    index={index}
                    length={arr.length}
                    onChange={distributionItemChange}
                    type={1}
                  />
                ))}
              </div>
              <div className="fcblack5 fs12">
                注意：填写的获得佣金比例均为订单实付金额的比例。建议不超过两级，否则有法律风险！
              </div>
              <div className="fcblack5 fs12">
                推荐关系设置为
                『直接推荐』关系时，消费者和分销商A、B必须时直接推荐关系才能获得{configDistribution.name}；
              </div>

              {
                configDistribution.data && configDistribution.data.commission_origin &&
                <div className={styles.switchBox}>
                  <XSwitch
                    onChange={e => {
                      toogleSwitch('commission_origin', e)
                    }}
                    defaultChecked={commission_origin}
                    name={configDistribution.data.commission_origin.name}
                    desc={[
                      `,若经销佣金也开启且上级经销商利润大于分销佣时，${configDistribution.name}由上级经销商支付；`,
                      `，${configDistribution.name}由平台支付；`,
                    ]}
                  />
                </div>
              }


              {/* 佣金熔断 */}
              {
                configDistribution.data && configDistribution.data.fusing &&
                <div className={styles.switchBox}>
                  <XSwitch
                    onChange={e => {
                      toogleSwitch('distbSwitchFusing', e)
                    }}
                    defaultChecked={distbSwitchFusing}
                    name={configDistribution.data.fusing.name}
                    desc={[]}
                  />
                </div>
              }

              {/* 取消了 20200416
              
              <div className={styles.switchBox}>
                <XSwitch
                  onChange={e => {
                    toogleSwitch('agent_inside', e)
                  }}
                  defaultChecked={agent_inside}
                  name="分销内购"
                  desc={[
                    ',分销商自己拿一级佣金，上级拿二级佣金；',
                    ',上级拿一级佣金；',
                  ]}
                />
              </div> */}


              {/* 佣金顺延 */}
              {
                configDistribution.data && configDistribution.data.commission_postpone &&
                <div className={styles.switchBox}>
                  <XSwitch
                    onChange={e => {
                      toogleSwitch('commission_postpone', e)
                    }}
                    defaultChecked={commission_postpone}
                    name={configDistribution.data.commission_postpone.name}
                    desc={[
                      `，${configDistribution.name}与其它返利不能共享时，受益人顺延；`,
                      `，${configDistribution.name}与其它返利不能共享时，没有${configDistribution.name}；`,
                    ]}
                  />
                </div>
              }

            </div>
          )}
        </div>

        <div className={styles.pageBlockContainer}>
          {/* 代理佣金 */}
          <PanelTitle
            onChange={e => {
              toogleSwitch('isProxy', e)
            }}
            defaultChecked={isProxy}
            title={configAgent.name}
            help={configAgent.tips}
            desc={[`，则产生${configAgent.name}`, `，则不产生${configAgent.name}`]}
          />
          {isProxy === 1 && (
            <div className={`${styles.panelContainer} animated fadeIn`}>
              <div className={styles.blockContainer}>
                {proxyItems.map((it, index, arr) => (
                  <DistributionBlock
                    key={it.uuid}
                    item={it}
                    index={index}
                    length={arr.length}
                    onChange={proxyItemChange}
                    type={2}
                  />
                ))}
              </div>

              {/* 佣金熔断 */}
              {
                configAgent.data && configAgent.data.fusing &&
                <div className={styles.switchBox}>
                  <XSwitch
                    onChange={e => {
                      toogleSwitch('agentSwitchFusing', e)
                    }}
                    defaultChecked={agentSwitchFusing}
                    name={configAgent.data.fusing.name}
                    desc={[
                      `，自己和比自己级别低的都不拿${configAgent.name}；`,
                      `，自己和上级代理都拿${configAgent.name}；`,
                    ]}
                  />
                </div>
              }

              {/* <div className={styles.switchBox}>
                <XSwitch
                  onChange={e => {
                    toogleSwitch('proxy_agent_inside', e)
                  }}
                  defaultChecked={proxy_agent_inside}
                  name="代理内购"
                  desc={[
                    ',自己和比自己级别低的都不拿代理佣金；',
                    ',自己和上级代理都拿代理佣金；',
                  ]}
                />
              </div> */}

              <div className="fcblack5 fs12" style={{ marginTop: 10 }}>
                #省级代理商下单,省市区级代理商都不拿{configAgent.name};
              </div>
              <div className="fcblack5 fs12">
                #市级代理商下单,市区级代理商不拿{configAgent.name};
              </div>
              <div className="fcblack5 fs12">
                #区级代理商下单,只有区级代理商自己不拿{configAgent.name}。
              </div>
            </div>
          )}
        </div>

        <Form>
          <div className={styles.pageBlockContainer}>
            {/* 团队分红 */}
            <PanelTitle
              onChange={e => {
                toogleSwitch('isTeam', e)
              }}
              defaultChecked={isTeam}
              title={configTeam.name}
              help={configTeam.tips}
              desc={[`，则产生${configTeam.name}`]}
            />

            {isTeam === 1 && (
              <FormItem
                style={{ display: 'flex', padding: '20px 44px' }}
                label="分红金额"
              >
                {getFieldDecorator('money', {
                  rules: [
                    {
                      required: true,
                      message: '请输入',
                    },
                  ]
                })(
                  <InputNumber
                    style={{ width: 164 }}
                    placeholder="请输入"
                    addonAfter="元"
                  />
                )}
              </FormItem>
            )}
          </div>

          <div className={styles.pageBlockContainer}>
            {/* 经销差价 */}
            <PanelTitle
              onChange={e => {
                toogleSwitch('isPrice', e)
              }}
              defaultChecked={isPrice}
              title={configAgency.name}
              help={configAgency.tips}
              desc={[`，则产生${configAgency.name}`]}
            />
            {/* {isPrice === 1 && (
              <FormItem
                style={{ display: 'flex', padding: '20px 44px' }}
                label="拿货价格"
              >
                {getFieldDecorator('ratio', {
                  rules: [
                    {
                      required: true,
                      message: '请输入',
                    },
                  ]
                })(
                  <InputNumber
                    placeholder="请输入"
                    style={{ width: 164 }}
                    addonAfter="%"
                  />
                )}
              </FormItem>
            )} */}
          </div>
        </Form>
        {
          $api.system.setRebate.permission() && (
            <Row
              type="flex"
              justify="center"
              style={{ backgroundColor: '#fff', padding: 12 }}
            >
              <Button loading={loading} onClick={submit} type="primary">提交</Button>
            </Row>
          )
        }
      </Page>
    )
  }
}

export default RebateSet
