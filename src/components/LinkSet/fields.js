export const ENUMS = {
    1: 'order', // 我的订单
    2: 'coupon', // 优惠券列表
    3: 'collect', // 我的收藏
    4: 'customize', // 自定义页面
    5: '1',
    6: 'detail', // 商品详情
    7: 'category', // 商品分类
    8: 'otherLink', // 外部链接
    9: 'live' // 直播
}
export const System_page = [    
    {
        name: '我的订单',
        linkType: ENUMS[1],
    },
    {
        name: '优惠券',
        linkType: ENUMS[2],
    },
    {
        name: '我的收藏',
        linkType: ENUMS[3],
    },
    {
        name: '直播',
        linkType: ENUMS[9],
    }
]

export const tabItems = [
    {
        name: '系统功能页',
        linkType: ENUMS[5],
    },
    {
        name: '商品详情',
        linkType: ENUMS[6]
    },
    {
        name: '商品分类',
        linkType: ENUMS[7]
    },
    {
        name: '自定义页面',
        linkType: ENUMS[4]
    },
    {
        name: '外部链接',
        linkType: ENUMS[8]
    },
]

export const findActivityTab = (linkType) => {
    if (!linkType) return ENUMS[5]
    const item = tabItems.find(it => it.linkType === linkType)
    if (item) {
        return linkType
    } else {
        return ENUMS[5]
    }
}