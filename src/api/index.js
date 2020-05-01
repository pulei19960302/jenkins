/**
 * Created by hetingfeng on 2018/11/1.
 */

/* 自动注册modules，减少代码量 */
const requireAll = val => val.keys().map(val);
const req = require.context('./modules', true, /\.js/);
const api = {};
requireAll(req).map(curr => {
    api[curr.default.name] = curr.default.module;
})
export default api;
