import { Checkbox } from 'antd';
import { ENUMS } from './fields';

export const page_types = [
    {
        value:2,
        label:'自定义'
    },
    {
        value:1,
        label:'系统页面'
    }
]

export const page_enum = page_types.reduce((a,b)=>{
    a[b.value] = b.label
    return a
},{})

export const searchFields = [
    {
        key: 'goods_title',
        placeholder: '请输入商品 ID/商品名称'
    }
]

export const getColumns = function(linkParams,onCheck){
    return [
        {
            title: '商品ID',
            dataIndex: 'goods_id',
            width: 120,
        },
        {
            title: '商品名称',
            dataIndex: 'title',
            tableOverflow: true,
        },
        // {
        //     title: '商品图片',
        //     dataIndex: 'main_img',
        //     key: 'main_img',
        //     width: 130,
        //     previewImg: true,
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            fixed: 'right',
            width: 180,
            render:(text,row)=>{
                return (
                    <div>
                        <Checkbox onChange={e=>{
                            if(e.target.checked){
                                onCheck(row.goods_id,ENUMS[6],`商品详情(商品id:${row.goods_id})`)
                            }else{
                                onCheck('','','')
                            }
                        }} checked={+linkParams===+row.goods_id}></Checkbox>
                    </div>
                )
            }
        }
    ]
}