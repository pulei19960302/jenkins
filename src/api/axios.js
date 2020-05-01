/**
 * Created by hetingfeng on 2018/11/1.
 * desc: axios统一请求方法
 * @param { String } path 请求路由url 允许使用动态匹配,形如axios('/list/details/:id/')
 * @param { Object } options 请求参数
 * @param { String } options.method 请求方式
 * @param { String } options.headers 设置请求头
 * @param { Object } options.params 请求携带参数，包含动态匹配的参数
 * @param { String } baseURL process.env.BASE_API
 * @param { Object } otherConfig 其他自定义配置项，如关闭指定提示（showMsg）
 * @return { Object } 返回axios promise对象
 */

import axios from 'axios';
import { _, Common, Token } from '@/OMS/utils';
import store from '@/store';
import { Message } from 'element-ui';

const proxyConfig = require('@/proxyConfig.js');

function messageTip(msg, type, time) {
    Message({
        message: msg,
        type,
        duration: time * 1000
    });
}

axios.interceptors.request.use(config => {
    return config;
}, error => {
    throw new Error(error);
});

axios.interceptors.response.use(
    async response => {
        const { code, message } = response.data;
        const config = response.config;
        // 操作成功提示
        if (config.method.toUpperCase() !== 'GET' && code === 0 &&  config.showMsg) messageTip(message, 'success', 1.5);
        // code非0时报错
        if (code !== 0) {
            messageTip(message, 'error', 3);
            // code为401，返回首页，清除stroe，清除本体缓存数据等
            if (code === 401) await store.dispatch('user/LogOut', true);
            return Promise.reject(response);
        }
        return response.data;
    },
    error => {
        if(error.code === 'ECONNABORTED') {
            messageTip('请求超时，请稍后重试', 'error', 3);
        } else {
            messageTip('网络异常', 'error', 3);
        }
        return Promise.reject(error);
    }
);

export default (path, options = { method: 'GET' }, otherConfig = { showMsg: true }) => {
    // 由于引用数据类型按共享传递，进行配置项深拷贝
    const opt = _.cloneDeep(options);
    opt.method = opt.method.toUpperCase();
    // 删除空的请求字段(注意字段为0的特殊情况)
    for (const key in opt.params) {
        if (!opt.params[key] && opt.params[key] != '0') delete opt.params[key];
    }
    const url = Common.replaceQuery(path, opt);

    let baseUrl = null;

    if (url.includes('/v2')) {
        baseUrl = ''
    } else if (url.includes('/v3')) {
        baseUrl = ''
    } else {
        baseUrl = url.includes('/im') ? (proxyConfig.getOrigin ? proxyConfig.getOrigin('ws_send') : proxyConfig.ws_send) : '/v1'
    }

    const axiosConfig = {
        url,
        method: opt.method,
        data: opt.params,
        baseURL: baseUrl,
        headers: options.headers || {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        // 请求超时时间
        timeout: 55000
    };
    Object.keys(otherConfig).map(curr => {
        axiosConfig[curr] = otherConfig[curr];
    });
    // 全局增加token验证
    if (Token.getToken()) axiosConfig.headers.Authorization = `Bearer ${Token.getToken()}`;
    // tips：php未反解加密方式，im调试先写死token
    if (url.includes('/im')) axiosConfig.headers.Authorization = `Bearer ${Token.getToken()}`;
    return axios(axiosConfig);
};
