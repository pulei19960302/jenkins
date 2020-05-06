import { createUUID } from 'utils'
export const getAllComponents = function () {
    return [
        {
            id: '1',
            name: '店招',
            icon: 'iconAD1',
            type: 'base',
            content: {
                top_template_id: 1, // 顶部模板id
                icons: [  // 顶部icon
                    {
                        title: "",
                        feature_id: '',
                        color: "#333333"
                    }
                ],
                topBackgroundColor: '#ffffff', // 顶部背景色
                need_banner: true, // 是否需要banner
                banner_template_id: 1, // banner 模板 id
                background_type: 1, // 店招背景类型
                background_image: '',// 背景图
                banners: []
            }
        },
        {
            id: '2',
            name: '图标导航',
            icon: 'icontupiandaohang2',
            type: 'base',
            style: {
                height: 50
            },
            content: {
                template_id: 1,
                imgs: [
                    {
                        img: "",
                        title: "",
                        color: "#333333",
                        uuid: 2020101
                    }
                ]
            }
        },
        {
            id: '3',
            name: '图片',
            icon: 'icontupian3',
            type: 'base',
            content: {
                template_id: 1,
                imgs: [
                    {
                        img: ''
                    }
                ]
            }
        },
        {
            id: '4',
            name: '轮播图',
            icon: 'iconlunbotu2',
            type: 'base',
            style: {
                height: 100
            },
            content: {
                template_id: 1,
                imgs: []
            }
        },
        {
            id: '5',
            name: '优惠券',
            icon: 'iconyouhuiquan5',
            type: 'market',
            style: {
                height: 96
            },
            content: {
                template_id: 1,
                color: '#FF533B',
                sendWay: 1, // 添加方式
                couponChoosed: [], // 已选优惠券[int]
                all_visible: 0
            }
        },
        {
            id: '6',
            name: '标题',
            icon: 'iconbiaoti2',
            type: 'base',
            content: {
                title: '标题',
                position: 'left',
                link: false,
                fontSize: 16,
                fontColor: '#000',
                isBold: 'bold',
                linkText: '更多',
            }
        },
        {
            id: '7',
            name: '商品',
            icon: 'iconshangpin3',
            type: 'base',
            content: {
                template_id: 1,
                // select goods
                ...BaseGoodsSelectFields,
                // style
                showMainTitle: true,
                showSubTitle: true,
                showSaleNum: true,
                showGoodsTag: true,
                bottomBtnType: 1,
                bottomBtnStyle: 1,
                bottomBtnText: '马上抢'
            }
        },
        // {
        //     id:'8',
        //     name:'商品分组',
        //     icon:'iconfenzutuijian',
        //     type:'base',
        //     content:{
        //         top_template_id:1,
        //         goods_template_id:1,
        //         // style
        //         showMainTitle:true,
        //         showSubTitle:true,
        //         showSaleNum:true,
        //         showGoodsTag:true,
        //         bottomBtnType:1,
        //         bottomBtnStyle:1,
        //         bottomBtnText:'马上抢',
        //         groups:[
        //             {
        //                 title:'',
        //                 maxNum:10,
        //                 ...BaseGoodsSelectFields,
        //                 uuid:2020101
        //             }
        //         ]
        //     }
        // },
        {
            id: '9',
            name: '限时抢购',
            icon: 'iconxianshiqianggou1',
            type: 'market',
            content: {
                top_template_id: 1,
                goods_template_id: 1,
                // style
                showMainTitle: true,
                showSubTitle: true,
                showSaleNum: true,
                showGoodsTag: true,
                showProgress: true,
                bottomBtnType: 1,
                bottomBtnStyle: 1,
                bottomBtnText: '马上抢'
            }
        }
    ]
}

export const BaseGoodsSelectFields = {
    addWay: 1,
    goodsChoosed: [],
    groupType: 1,
    goodsLabels: [],
    goodsCats: [],
    sort: '',
}

// 不同维度的页面级设置强行加入 假装是个 component 特殊处理
export const Faker = {
    id: '9999999',
    name: '页面设置',
    content: {
        name: '首页'
    },
    component_id: '999999999',
    active: false
}

export const getFilterComponents = function (type) {
    return getAllComponents().filter(it => it.type === type)
}

export const generateSelectedComponents = function (id) {
    const allComponents = getAllComponents()
    const { res } = idFindList(allComponents, id)
    res.component_id = res.id
    res.id = `cameFromFe_${createUUID()}`
    return res
}

export const idFindList = function (olist, id) {
    let res = null
    let i = null
    const list = JSON.parse(JSON.stringify(olist))
    list.forEach((it, index) => {
        if (String(it.id) === String(id)) {
            res = it
            i = index
        }
    })
    return {
        res,
        index: i
    }
}

export const idActive = function (list, id) {
    const res = list.slice(0)
    const { index } = idFindList(list, id)
    res.forEach(it => it.active = false)
    res[index].active = true
    return res
}

export const handleDataTofields = (data) => {
    const allComponents = getAllComponents()
    const res = []
    allComponents.forEach(it => {
        data.forEach(item => {
            if (item.component_id === +it.id) {
                res.push(Object.assign({}, it, item, {
                    id: `cameFromBackend_${item.id}`, // 防止组件后端id与左侧组件id相同导致拖拽异常
                    content: JSON.parse(item.content)
                }))
            }
        })
    })
    return res.sort((a, b) => a.sort - b.sort)
}


