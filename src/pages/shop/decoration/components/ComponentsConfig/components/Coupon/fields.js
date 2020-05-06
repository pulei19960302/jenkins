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
        color: ['#FF7C75', '#EA4A56']
    },
    {
        id: 2,
        color: ['#F4AC80', '#F35C44']
    },
    {
        id: 3,
        color: ['#D78AF0', '#B83FEB']
    },
    {
        id: 4,
        color: ['#79DDB4', '#3ACA8B']
    },
    {
        id: 5,
        color: ['#999999', '#363636']
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
            if (it.color.join(",") === (typeof activeColor === 'string'? activeColor : activeColor.join(","))) {
                it.active = true
            } else {
                it.active = false
            }
        })
    }
    return colors
}