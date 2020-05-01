import { idActive,BaseGoodsSelectFields } from '../../../../fields';
import { createUUID } from 'utils';
const tplList = [
    {
        id:1,
        img: require('assets/shop/goods/group_style.png'),
    },
]

const showTpList = [
    {
        id:1,
        img: require('assets/shop/goods/group.png'),
    }
]
export const getTplList = function(type,activeId){
    const resArr = type === 1 ? tplList : showTpList
    if(activeId){
        return idActive(resArr,activeId)
    }
    return resArr
}
export const getItem = (arr)=>{
    if(arr){
        const newarr = JSON.parse(JSON.stringify(arr))
        newarr.forEach(it=>it.uuid = createUUID())
        return newarr
    }
    return {
        title:'',
        maxNum:10,
        ...BaseGoodsSelectFields,
        uuid:createUUID()
    }
}