import { Fragment } from 'react'
import { Divider } from 'antd'
import { ExclamationCircleTwoTone, RightCircleFilled } from '@ant-design/icons'
import { Switch } from 'antd'
import { PRODUCT_STATUS, PRODUCT_STATUS_NAME, hasBtn } from '../../constants'
export const tabsFilds = [
  {
    title: '全部商品',
    value: '-1',
  },
  {
    title: '已上架',
    value: PRODUCT_STATUS.UPPER_SHELF,
  },
  {
    title: '预上架',
    value: PRODUCT_STATUS.PRELOADING,
  },
  {
    title: '已下架',
    value: PRODUCT_STATUS.LOWER_SHELF,
  },
  {
    title: '预警',
    value: PRODUCT_STATUS.EARLY_WARNING,
  },
  {
    title: '售罄',
    value: PRODUCT_STATUS.SELL_OUT,
  },
]

export const getFormatedCategoryTreeData = (srcData) => {
  if (srcData.length === 0) { return [] }
  return srcData.map((item) => {
    return {
      title: item.name,
      value: item.id,
      children: item.sub.length === 0
        ? []
        : item.sub.map((subItem) => {
          return {
            title: subItem.name,
            value: subItem.id
          }
        })
    }
  })
}

export const getFields = function () {
  const { supplierList, categoryList } = this.state
  return [
    {
      key: 'goods_id',
      placeholder: '商品id',
    },
    {
      key: 'keywords',
      placeholder: '商品名称',
    },
    {
      type: 'treeSelect',
      key: 'goods_category_ids',
      inputProps: {
        placeholder: '商品类目',
        treeData: getFormatedCategoryTreeData(categoryList),
        multiple: true
      }
    },
    {
      type: 'enum',
      key: 'supplier_id',
      placeholder: '供应商',
      enums: supplierList.map((item) => ({ name: item.name, value: item.id })),
    },
  ]
}

export const getColumns = function () {
  return [
    {
      title: '商品ID',
      dataIndex: 'goods_id',
      width: 100
    },
    {
      title: '商品',
      dataIndex: 'main_img',
      width: 60,
      imgWidth: 40,
      imgHeight: 40,
      previewImg: true,
    },
    {
      title: '',
      dataIndex: 'title',
      width: 180,
      tableOverflow: true,
      maxLine: 2
    },
    {
      title: '总库存',
      dataIndex: 'total_stock',
      render: (text, row) => {
        const warn = +row.total_stock < +row.warning_value
        return (<div>
          <span>{row.total_stock}</span>
          {
            warn && <ExclamationCircleTwoTone twoToneColor="#ff4d4f" style={{ marginLeft: 4 }} />
          }
        </div>)
      }
    },
    {
      title: '总销量',
      dataIndex: 'total_sale_num',
    },
    {
      title: '商品类目',
      dataIndex: 'category_str',
    },
    {
      title: '供应商',
      dataIndex: 'supplier_str',
    },
    {
      title: '修改时间',
      dataIndex: 'updated_at',
    },
    {
      title: '上下架状态',
      dataIndex: 'goods_status',
      render: (text, row) => {
        const checked = row.goods_status === 2 ? true : false
        return (<div>
          {PRODUCT_STATUS_NAME[row.goods_status]}
          {
            hasBtn('productHandle') && <Switch
              checked={checked}
              style={{ marginLeft: 5, verticalAlign: 'bottom' }}
              onChange={(checked) => this.changeProductStatus([row.goods_id], checked ? PRODUCT_STATUS.UPPER_SHELF : PRODUCT_STATUS.LOWER_SHELF)} />
          }
        </div>)
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 160,
      render: (text, row) => (
        <div>
          {
            hasBtn('editProduct') &&
            <Fragment>
              <a onClick={() => { this.editProduct(row.goods_id) }} >
                编辑
              </a>
              <Divider type="vertical" />
            </Fragment>
          }
          {
            hasBtn('addProduct') &&
            <Fragment>
              <a onClick={() => { this.copyProduct(row.goods_id) }} >
                复制
              </a>
              <Divider type="vertical" />
            </Fragment>
          }
          {
            hasBtn('productDelete') &&
            <a onClick={() => { this.deleteProducts([row.goods_id]) }}>
              删除
            </a>
          }
        </div>
      )
    },
  ]
}


export const PAGINATION_BTNS = [{
  name: '上架',
  key: 'putaway',
  permisison: hasBtn('productHandle'),
}, {
  name: '下架',
  key: 'outOfStock',
  permisison: hasBtn('productHandle'),
}, {
  name: '删除',
  key: 'del',
  permisison: hasBtn('productDelete'),
}].filter(el => el.permisison)