import { idActive } from '../../../../fields';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/goods/grid_style.png'),
    },
    {
        id: 2,
        img: require('assets/shop/goods/list_style.png'),
    },
    // {
    //     id: 3,
    //     img: require('assets/shop/goods/big_picture_style.png'),
    // }
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/goods/grid.png'),
    },
    {
        id: 2,
        img: require('assets/shop/goods/list.png'),
    },
    // {
    //     id: 3,
    //     img: require('assets/shop/goods/big_picture.png'),
    // }
]

export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}