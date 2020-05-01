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
        key: 'key_word',
        placeholder: '请输入页面id或名称',
    }
]

export const getPageColumns = function(linkParams,onCheck){
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 120,
        },
        {
            title: '页面名称',
            dataIndex: 'name',
            width: 120,
            tableOverflow: true,
        },
        {
            title: '页面分类',
            dataIndex: 'page_type_id',
            width: 120,
            render(text){
                return <span>{page_enum[text]}</span>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(text){
                return <span>{({0:'未发布',1:'已发布'})[text]}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
        },
        {
            title: '更新时间',
            dataIndex: 'updated_at',
        },
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
                                onCheck(row.id,ENUMS[4],`自定义页面:${row.name}(页面id:${row.id})`)
                            }else{
                                onCheck('','','')
                            }
                        }} checked={+linkParams===+row.id}></Checkbox>
                    </div>
                )
            }
        }
    ]
}