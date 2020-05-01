import { idActive } from '../../../fields';
import { createUUID } from 'utils';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/navigation/style1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/navigation/style2.png'),
    },
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/navigation/navigation1.png'),
        style: {
            padding: 12
        }
    },
    {
        id: 2,
        img: require('assets/shop/navigation/navigation2.png'),
    },
]

export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}

const colors = [
    {
        id: 1,
        color: '#333333'
    },
    {
        id: 2,
        color: '#FF533B'
    },
    {
        id: 3,
        color: '#FE8D1E'
    },
    {
        id: 4,
        color: '#3D78DF'
    },
    {
        id: 5,
        color: '#57BD48'
    }
]

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
        img: '',
        color: getColors()[0].color,
        uuid: createUUID()
    }
}