import { Divider, Popconfirm, Tooltip, Button } from 'antd'
import { Fragment } from 'react';

export const searchFields = [
    {
        key: 'key_word',
        placeholder: '请输入页面id或名称',
    }
]

export const page_types = [
    {
        value: 2,
        label: '自定义'
    },
    {
        value: 1,
        label: '首页'
    }
]

export const page_enum = page_types.reduce((a,b)=>{
    a[b.value] = b.label
    return a
},{})

export const getColumns = function(){
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
        // {
        //     title: '浏览量',
        //     dataIndex: 'view',
        //     width: 120,
        // },
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
                console.log("text",text)
                console.log("row",row)
                console.log("===================================")
                return (
                    <div>
                        {
                            $api.shop.editPage.permission() &&
                            <>
                            <a
                                onClick={() => {
                                this.goEdit(row.id)
                                }}
                            >
                                编辑
                                
                            </a>
                            </>
                        }
            
                        {
                            $api.shop.prod.permission() && 
                            (
                                row.publishable ===1 ?
                                <>
                                    <Divider type="vertical" />
                                    <Popconfirm
                                    title="确认后页面将生效，确认发布此页面?"
                                    placement="topRight"
                                    onConfirm={() => {
                                        this.prod(row.id)
                                    }}
                                    okText="确认"
                                    cancelText="取消">
                                    <Button type="link" size="small" >发布</Button>
                                    </Popconfirm>
                                </>
                                :
                                <>
                                    <Divider type="vertical" />
                                    <Tooltip placement="topRight" title="C端已是最新版本，不需要重复发布了">
                                    <Button type="link" size="small" disabled>发布</Button>
                                    </Tooltip>
                                </>
                            )
                        }

                        {
                            +row.page_type_id!==1 && $api.shop.delPage.permission() &&
                            <>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="确认删除这个页面?"
                                    placement="topRight"
                                    onConfirm={() => {
                                        this.del(row.id)
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a
                                    className="fcred5"
                                    >
                                    删除
                                    </a>
                                </Popconfirm>
                            </>
                        }
                    </div>
                )
            }
        }
    ]
}