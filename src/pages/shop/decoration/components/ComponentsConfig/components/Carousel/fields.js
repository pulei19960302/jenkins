import { idActive } from '../../../fields';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/carousel/carousel1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/carousel/carousel2.png'),
    },
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/carousel/style1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/carousel/style2.png'),
        style: { padding: 12 }
    },
]

export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}