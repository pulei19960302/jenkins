import { Divider } from 'antd'
import { FSwitch } from 'components'
import {
  DELIVEY_TABS,
  TEMPLATE_STATUS,
  TEMPLATE_FIELDS as statusFields,
  VALUATION_FIELDS as typeFields,
} from '../../constants'

export const tabsFields = [
  {
    title: '运费模板',
    value: DELIVEY_TABS.TEMPLATE,
    key: 'template',
  },
  {
    title: '物流公司',
    value: DELIVEY_TABS.EXPRESS,
    key: 'express',
  },
  {
    title: '运费险',
    value: DELIVEY_TABS.INSURANCE,
    key: 'insurance',
  },
]

