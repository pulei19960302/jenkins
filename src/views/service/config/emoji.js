/**
 * desc     通过emoji名正确匹配对应图片
 * @param   emoji
 * @returns 对应emoji图片
 */
import data from './emojiData.js';

let emojiData = {};
Object.values(data).forEach(item => {
    emojiData = { ...emojiData, ...item };
})
export function emoji(value) {
    if (!value) return;
    Object.keys(emojiData).forEach(item => {
        value = value.replace(new RegExp(item, 'g'), createIcon(item));
    })
    return value;
}
function createIcon(item) {
    const value = emojiData[item];
    const path = '/static/imgs/emoji/';
    return `<img src=${path}${value} width="16px" height="16px">`;
}
