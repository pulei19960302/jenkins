import React, { useEffect, useState } from 'react'
import { TreeSelect } from 'antd';
const { TreeNode } = TreeSelect;

export default function ChooseCat({ value, onChange }) {
    let [nodes, setNodes] = useState([])
    let [init, setInit] = useState(false)

    useEffect(() => {
        if (init) return
        setInit(true)
        $api.category.categoryList({ status: 1 }).then(res => {
            setNodes(res.data.item)
        })
    }, [init])
    return (
        <TreeSelect
            showSearch
            treeNodeFilterProp="title"
            value={value}
            placeholder="请选择分类"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChange}
            getPopupContainer={triggerNode => triggerNode.parentElement}
        >
            {
                nodes.map((it, i) =>
                    <TreeNode key={it.id} value={it.id} title={it.name}>
                        {
                            it.sub ?
                                it.sub.map((oit, index) => <TreeNode key={oit.id} value={oit.id} title={oit.name}>
                                    {
                                        oit.sub ?
                                            oit.sub.map(ooit => <TreeNode key={ooit.id} value={ooit.id} title={ooit.name}></TreeNode>)
                                            : null
                                    }
                                </TreeNode>)
                                : null
                        }
                    </TreeNode>
                )
            }
        </TreeSelect>
    )
}