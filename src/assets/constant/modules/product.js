/**
 * Created by hetingfeng on 2019/1/16 0016.
 */
const product = {
    GOODS_TYPES: [
        { label: '普通商品', value: 0 },
        { label: '粉丝商品', value: 1 },
        { label: '白银商品', value: 2 },
        { label: '引流商品', value: 10 },
        { label: '砍价商品', value: 11 },
        { label: '免单商品', value: 12 },
        { label: '拼团商品', value: 13 },
        { label: '专题商品', value: 14 },
        { label: '活动商品', value: 15 }
    ],
    STEPS: [
        { value: 'information', label: '基本信息' },
        // { value: 'tags-type', label: '商品标签' },
        { value: 'parameter', label: '商品参数' },
        { value: 'attribute', label: '销售属性' },
        { value: 'describe', label: '商品描述' },
        { value: 'setting', label: '功能设置' },
        { value: 'sales', label: '推荐促销' },
        // { value: 'integration', label: '积分设置' },
        // { value: 'imgs', label: '图片管理' },
        // { value: 'logistics', label: '商品物流' },
        // { value: 'afterSale', label: '商品售后' },
    ]
}
export default product;
