import { idActive } from '../../../fields';
import { createUUID } from 'utils';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/shopTricks/head_style1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/shopTricks/head_style2.png'),
    },
    {
        id: 3,
        img: require('assets/shop/shopTricks/head_style3.png'),
    },
    {
        id: 4,
        img: require('assets/shop/shopTricks/head_style4.png'),
    }
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/shopTricks/head1.png'),
        style: {
            height: 96
        }
    },
    {
        id: 2,
        img: require('assets/shop/shopTricks/head2.png'),
    },
    {
        id: 3,
        img: require('assets/shop/shopTricks/head3.png'),
    },
    {
        id: 4,
        img: require('assets/shop/shopTricks/head4.png'),
    }
]

const colors = [
    {
        id: 1,
        color: '#333333'
    },
    {
        id: 2,
        color: '#EEEEEE'
    }
]

export const index_features = [
    {
        id: 1,
        title: '消息'
    },
    {
        id: 2,
        title: '分享'
    },
    {
        id: 3,
        title: '购物车'
    },
    {
        id: 4,
        title: '分类'
    },
    {
        id: 5,
        title: '优惠券'
    }
]


export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}

export const getColors = function (activeColor) {
    if (activeColor) {
        colors.forEach(it => {
            if (it.color === activeColor) {
                it.active = true
            } else {
                it.active = false
            }
        })
    }
    return colors
}

export const getItem = (arr) => {
    if (arr) {
        const newarr = JSON.parse(JSON.stringify(arr))
        newarr.forEach(it => it.uuid = createUUID())
        return newarr
    }
    return {
        title: '',
        feature_id: '',
        color: getColors()[0].color,
        uuid: createUUID()
    }
}

const bannerTpl = [
    {
        id: 1,
        img: require('assets/shop/shopTricks/banner_style1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/shopTricks/banner_style2.png'),
    },
    // {
    //     id: 3,
    //     img: require('assets/shop/shopTricks/banner_style3.png')
    // }
]

const showBannerTpl = [
    {
        id: 1,
        img: require('assets/shop/shopTricks/banner1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/shopTricks/banner2.png'),
    },
    // {
    //     id: 3,
    //     img: require('assets/shop/shopTricks/banner3.png'),
    // }
]

export const getBannerTplList = function (type, activeId) {
    const resArr = type === 1 ? bannerTpl : showBannerTpl
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}

export const getBannerItem = (arr) => {
    if (arr) {
        const newarr = JSON.parse(JSON.stringify(arr))
        newarr.forEach(it => it.uuid = createUUID())
        return newarr
    }
    return {
        img: '',
        mainColor: '',
        uuid: createUUID()
    }
}