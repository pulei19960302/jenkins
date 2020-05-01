import { Fragment } from 'react'
import { Divider } from 'antd'
export const getTableColums = function () {
    return [
        {
            title: '成员账号',
            dataIndex: 'username',
        },
        {
            title: '成员姓名',
            dataIndex: 'name',
        },
        {
            title: '用户分组',
            dataIndex: 'group_name',
        },
        {
            title: '成员角色',
            dataIndex: 'role_names',
            width: 180,
            tableOverflow: true,
        },
        {
            title: '添加时间',
            dataIndex: 'created_at',
        },
        {
            title: '操作',
            width: 120,
            render: (text, row) => (
                <div>
                    {
                        $api.permissions.updateMember.permission() &&
                        <Fragment>
                            <a onClick={() => { this.editMember(row) }} >
                                编辑
                            </a>
                            <Divider type="vertical" />
                        </Fragment>
                    }
                    {
                        $api.permissions.deleteMember.permission() &&
                        <a onClick={() => { this.deleteMember([row.id]) }}>
                            删除
                        </a>
                    }
                </div>
            )
        },
    ]
}

export const getSearchFields = (enums = []) => {
    return [
        {
            key: 'member_account',
            placeholder: '成员账号',
        },
        {
            key: 'member_name',
            placeholder: '成员姓名',
        },
        {
            key: 'role_id',
            placeholder: '成员角色',
            type: 'enum',
            enums: enums,
        }
    ]
}