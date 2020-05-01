import React, { PureComponent } from 'react'
import { Drawer } from 'antd'
import { CommonTable } from 'components'
import { pagination } from 'utils/model'
import { columns, searchFields } from './fields'


export default class ChooseCoupon extends PureComponent {
    state = {
        visible: false,
        loading: false,
        list: [],
        pagination,
        query: {}
    }
    componentDidMount() {
        this.getList()
    }
    toogle = (visible) => {
        this.setState({
            visible
        })
    }
    toogleLoading = (loading) => {
        this.setState({
            loading
        })
    }
    getList = (payload) => {
        const { pagination, query } = this.state
        const { pageSize, current: page } = pagination
        const params = { page, pageSize, ...payload, ...query }

        $api.coupon.list({ page, page_size: params.pageSize, ...payload, ...query }, { loadingFn: this.toogleLoading }).then(res => {
            this.setState({
                list: res.data.items,
                pagination: {
                    total: res.data.count,
                    current: params.page,
                    pageSize: params.pageSize,
                }
            })
        })
    }
    onSearch = (query) => {
        this.setState({
            query,
        }, () => {
            this.getList({ page: 1 })
        })

    }
    mutipulClick = (key, selectedRowKeys) => {
        const { toogle } = this.props
        switch (key) {
            case 'cancel':
                toogle(false)
                break
            case 'sure':
                toogle(false)
                this.props.submit(selectedRowKeys)
                break
        }
    }
    render() {
        const { getList, onSearch, mutipulClick } = this
        const { loading, list, pagination } = this.state
        const { visible, choosed, toogle } = this.props
        const width = 1000
        const mutipulBtns = [
            {
                name: '确定',
                type: 'primary',
                key: 'sure',
            },
            {
                name: '取消',
                key: 'cancel',
                noCheck: true
            }
        ]
        return (
            <div>
                <Drawer
                    width={width}
                    title="选择优惠券"
                    placement="right"
                    onClose={() => { toogle(false) }}
                    visible={visible}
                    destroyOnClose
                    bodyStyle={
                        { paddingBottom:'74px'}
                    }
                >

                <CommonTable
                    columns={columns}
                    loading={loading}
                    dataSource={list}
                    getList={getList}
                    onSearch={onSearch}
                    pagination={pagination}
                    mutipulClick={mutipulClick}
                    mutipulBtns={mutipulBtns}
                    searchFields={searchFields}
                    pageProps={{
                        stylePros: {
                            width,
                            right: -2
                        }
                    }}
                    tableProps={{
                        defaultSelectedRowKeys: choosed
                    }}
                />
                </Drawer>
            </div >
        )
    }
}