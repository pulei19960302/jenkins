import React from 'react'
import { Divider, Badge, Switch } from 'antd'
import styles from '../index.less'

const StatusEnums = [
  { value: -1, name: '全部' },
  { value: 1, name: '启用' },
  { value: 2, name: '禁用' },
]

export const searchFields = [
  {
    key: 'label',
    placeholder: '请输入标签名称',
  },
  {
    type: 'enum',
    key: 'status',
    placeholder: '状态',
    enums: StatusEnums,
  },
]
export const getColumns = function() {
  return [
    {
      title: '标签名称',
      dataIndex: 'label',
      key: 'label',
      width: 200,
    },
    // {
    //   title: '所属分组',
    //   dataIndex: 'category_name',
    //   key: 'category_name',
    //   width: 400,
    // },
    {
      title: '标签样式',
      dataIndex: 'color',
      key: 'color',
      width: 200,
      render(color) {
        return (
          <div style={{background: (color.back_color), color: (color.font_color), border: color.back_color !== ''?'none':`1px solid ${color.font_color}`}} className={styles.text_box}>文字</div>
        )
      },
    },
    // {
    //   title: 'C端显示',
    //   dataIndex: 'is_show',
    //   key: 'is_show',
    //   width: 200,
    //   render: (is_show, rows) => (
    //       <Switch checkedChildren="是" unCheckedChildren="否" onChange={e => {this.isLabelShow(e, rows)}} defaultChecked={is_show === 1?true:false}/>
    //   )
    // },
    {
      title: '标签状态',
      dataIndex: 'status_name',
      key: 'status_name',
      width: 180,
      render: (status_name, rows) => {
        return (
          <Switch
            disabled={!$api.label.labelStatus.permission()}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            checked={status_name === '启用'}
            onChange={(e) => {
              this.labelStatusChange(rows.id, e ? 1 : 2);
            }}
          />
        )
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 300,
      render: (text, rows) => (
        <div>
          {
            $api.label.labelEdit.permission() &&
            <React.Fragment>
              <a
                onClick={() => {
                  this.showModal('editLabelModal', rows)
                }}
              >
                编辑
              </a>
              <Divider type="vertical" />
            </React.Fragment>
          }
          {/*{rows.status_name === '启用' && $api.label.labelStatus.permission() ? (*/}
          {/*  <React.Fragment>*/}
          {/*    <a*/}
          {/*      onClick={() => {*/}
          {/*        this.labelStatusChange(rows.id, 2)*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      禁用*/}
          {/*    </a>*/}
          {/*    <Divider type="vertical" />*/}
          {/*  </React.Fragment>*/}
          {/*) : (*/}
          {/*  <React.Fragment>*/}
          {/*    <a*/}
          {/*      onClick={() => {*/}
          {/*        this.labelStatusChange(rows.id, 1)*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      启用*/}
          {/*    </a>*/}
          {/*    <Divider type="vertical" />*/}
          {/*  </React.Fragment>*/}
          {/*)}*/}
          {
            $api.label.labelDel.permission() &&
            <React.Fragment>
              <a
                onClick={() => {
                  this.labelDelete(rows.id)
                }}
              >
                删除
              </a>
            </React.Fragment>
          }
        </div>
      ),
    },
  ]
}

