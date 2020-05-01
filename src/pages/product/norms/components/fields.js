import React from 'react'
import { Divider, Tag } from 'antd'
import { LinesEllipsis } from 'components'

export const searchFields = [
  {
    key: 'attr',
    placeholder: '规格名称',
  },
]
export const getColumns = function() {
  return [
    {
      title: '序号',
      render:(text,record,index)=>`${index+1}`
    },
    {
      title: '规格名称',
      width: 200,
      dataIndex: 'name',
      render: text => <LinesEllipsis text={text} maxLine="1" />
    },
    {
      title: '规格值',
      dataIndex: 'values',
      width: 300,
      // render: el => <LinesEllipsis text={el.map(el => el.value).join(',')} maxLine="1" />,
      render: el => {
        return <div>
          {el.map(e => <Tag key={e.attr_value_id} color="cyan">{ e.attr_item_value }</Tag>)}
        </div>
      }
    },
    {
      title:　'修改时间',
      dataIndex: 'updated_at'
    },
    {
      title: '操作',
      render:(text, row) => {
        return (
          <div>
            {
              $api.specs.editSpecs.permission() &&  <a
                onClick={() => {
                  this.editNormsModal(row)
                }}
              >编辑</a>
            }
            <Divider type="vertical"/>

            {
              $api.specs.delSpecs.permission() && <a
                onClick={() => {
                  this.handleDelNorms(row)
                }}
              >
                删除
              </a>
            }
          </div>
        )
      }
    }
  ]
}

