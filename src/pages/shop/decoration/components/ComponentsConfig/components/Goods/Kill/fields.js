import { idActive } from '../../../../fields';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/kill/style.png'),
    },
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/kill/kill.png'),
    }
]
export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}