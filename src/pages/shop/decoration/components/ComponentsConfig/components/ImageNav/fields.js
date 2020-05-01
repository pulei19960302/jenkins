import { idActive } from '../../../fields';
const tplList = [
    {
        id: 1,
        img: require('assets/shop/picture/style1.png'),
        imgNum: 1,
        size: '750 x 图片多高就是多高'
    },
    {
        id: 2,
        img: require('assets/shop/picture/style2.png'),
        imgNum: 1,
        size: '750 x 图片多高就是多高'
    },
    {
        id: 3,
        img: require('assets/shop/picture/style3.png'),
        imgNum: 2,
        size: '375 x 图片多高就是多高'
    },
    {
        id: 4,
        img: require('assets/shop/picture/style4.png'),
        imgNum: 3,
        size: '375*344 第2、3张图 375*172'
    }
]

const showTpList = [
    {
        id: 1,
        img: require('assets/shop/picture/picture1.png'),
    },
    {
        id: 2,
        img: require('assets/shop/picture/picture2.png'),
        style: { padding: 12 }
    },
    {
        id: 3,
        img: require('assets/shop/picture/picture3.png'),
        style: { padding: 12 }
    },
    {
        id: 4,
        img: require('assets/shop/picture/picture4.png'),
        style: { padding: 12 }
    }
]

export const getTplList = function (type, activeId) {
    const resArr = type === 1 ? tplList : showTpList
    if (activeId) {
        return idActive(resArr, activeId)
    }
    return resArr
}