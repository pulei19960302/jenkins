import { idActive } from '../../../fields';

const tplList = [
    {
        id: 1,
        img: require('assets/shop/coupon/style1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/coupon/style2.png'),
    }
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/coupon/coupon1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/coupon/coupon2.png'),
    }
]

const colors = [
    {
        id: 1,
        color: '#FF533B'
    },
    {
        id: 2,
        color: '#FE8D1E'
    },
    {
        id: 3,
        color: '#7D69E2'
    },
    {
        id: 4,
        color: '#57BD48'
    },
    {
        id: 5,
        color: '#444444'
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