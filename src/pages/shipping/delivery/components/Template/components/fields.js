import moment from 'moment'
import { Divider, TreeSelect, InputNumber } from 'antd'
import { FSwitch } from 'components'
import { cutOutDecimals } from 'utils'
import {
  TEMPLATE_STATUS,
  TEMPLATE_FIELDS as statusFields,
  VALUATION_FIELDS as typeFields,
  hasBtn,
} from '../../../../constants'
import styles from '../index.less'

const { SHOW_PARENT } = TreeSelect
const FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const getAddTemplateFields = function (areasList, unit) {
  return [
    {
      title: '配送区域',
      dataIndex: 'area_ids',
      width: 350,
      render: (text, row) => {
        const { id = '' } = row
        const name = 'area_ids'
        return <TreeSelect
          defaultValue={text}
          treeData={areasList}
          treeCheckable={true}
          showCheckedStrategy={SHOW_PARENT}
          style={{ width: '320px' }}
          allowClear={true}
          onChange={(value) => {
            const newValue = value && this.getSelectedAreas(value)
            this.handleUpdateRegion({ id, name, value: newValue })
          }}
        />
      }
    },
    {
      title: () => {
        return <span>首{unit}</span>
      },
      dataIndex: 'first_num',
      render: (text, row) => {
        const { id = '' } = row
        const name = 'first_num'
        return (
          <InputNumber
            max={99999}
            maxLength={5}
            defaultValue={text}
            formatter={value => cutOutDecimals(value)}
            onChange={(value) => { this.handleUpdateRegion({ id, name, value }) }}
          />)
      },
    },
    {
      title: '首费 (元)',
      dataIndex: 'first_price',
      render: (text, row) => {
        const { id = '' } = row
        const name = 'first_price'
        return (
          <InputNumber
            max={99999}
            maxLength={8}
            defaultValue={text}
            formatter={value => cutOutDecimals(value, 2)}
            onChange={(value) => { this.handleUpdateRegion({ id, name, value }) }}
          />)
      },
    },
    {
      title: () => {
        return <span>续{unit}</span>
      },
      dataIndex: 'follow_num',
      render: (text, row) => {
        const { id = '' } = row
        const name = 'follow_num'
        return (
          <InputNumber
            max={99999}
            maxLength={5}
            defaultValue={text}
            formatter={value => cutOutDecimals(value)}
            onChange={(value) => { this.handleUpdateRegion({ id, name, value }) }}
          />)
      },
    },
    {
      title: '续费 (元)',
      dataIndex: 'follow_price',
      render: (text, row) => {
        const { id = '' } = row
        const name = 'follow_price'
        return (
          <InputNumber
            max={99999}
            maxLength={8}
            defaultValue={text}
            formatter={value => cutOutDecimals(value, 2)}
            onChange={(value) => { this.handleUpdateRegion({ id, name, value }) }}
          />)
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        const { id = '' } = row || {}
        return (
          <a onClick={() => { this.handleDeleteRegion(id) }}>删除</a>
        )
      },
    },
  ]
}

export const getViewTemplateFields = function (areasList, unit) {
  return [
    {
      title: '配送区域',
      dataIndex: 'area_ids',
      width: 350,
      render: (text, row) => {
        return (
          <div className={styles.areas}>
            <TreeSelect
              defaultValue={text}
              treeData={areasList}
              treeCheckable={true}
              showCheckedStrategy={SHOW_PARENT}
              style={{ width: '320px' }}
              disabled={true}
            />
          </div>
        )
      },
    },
    {
      title: () => {
        return <span>首{unit}</span>
      },
      dataIndex: 'first_num',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '首费 (元)',
      dataIndex: 'first_price',
      render: (text) => <span>{text}</span>
    },
    {
      title: () => {
        return <span>续{unit}</span>
      },
      dataIndex: 'follow_num',
      render: (text) => <span>{text}</span>
    },
    {
      title: '续费 (元)',
      dataIndex: 'follow_price',
      render: (text) => <span>{text}</span>
    },
  ]
}

export const getTemplateSearch = function () {
  const typeEnums = typeFields && Object.keys(typeFields).reduce((obj, value) => (
    obj.concat([{ value, name: typeFields[value] }])
  ), [])

  const statusEnums = statusFields && Object.keys(statusFields).reduce((obj, value) => (
    obj.concat([{ value, name: statusFields[value] }])
  ), [])

  return [
    {
      key: 'name',
      placeholder: '请输入运费模板名称',
    },
    {
      key: 'type',
      placeholder: '全部计价方式',
      type: 'enum',
      enums: [
        { value: '', name: '全部计价方式' },
        ...(typeEnums || {}),
      ],
    },
    {
      key: 'status',
      placeholder: '状态',
      type: 'enum',
      enums: [
        { value: '-1', name: '全部状态' },
        ...(statusEnums || {}),
      ],
    },
  ]
}

export const getTemplateColumns = function () {
  return [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '模板名称',
      dataIndex: 'name',
    },
    {
      title: '计价方式',
      dataIndex: 'show_type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, row) => {
        const { id = '' } = row
        const ids = [id]
        return (
          <FSwitch
            values={[TEMPLATE_STATUS.ENABLED, TEMPLATE_STATUS.DISABLED]}
            texts={['启用', '禁用']}
            value={text}
            onChange={(e) => { this.handleSwitchStatus(e, ids) }}
            disabled={!hasBtn('swicthTemplateStatus')}
          />)
      },
    },
    {
      title: '修改人',
      dataIndex: 'update_username',
      render: (text, row) => (
        <span>{text ? text : row && row.create_username}</span>
      ),
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
      render: (text, row) => {
        const { created_at = '' } = row
        return (
          <span>
            {text ? moment(text).format(FORMAT) :
              (created_at && moment(created_at).format(FORMAT))}
          </span>)
      },
    },
    {
      title: '操作',
      dateIndex: 'operation',
      render: (text, row) => {
        const { id = '', status = '' } = row
        const ids = [id]

        if (status === TEMPLATE_STATUS.ENABLED) {
          return (
            <a onClick={() => { this.toggleViewTemplate(id) }}>查看</a>
          )
        }

        return (
          <div>
            {
              hasBtn('updateTemplate') && (
                <span>
                  <a onClick={() => { this.toggleTemplateModal(id) }}>编辑</a>
                  <Divider type="vertical" />
                </span>
              )
            }
            {
              hasBtn('deleteTemplates') && (
                <a onClick={() => { this.handleDeleteTemplates(ids) }}>删除</a>
              )
            }
          </div>
        )
      }
    },
  ]
}