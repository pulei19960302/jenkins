


const service = require('./OMS/service/api/url.js');
const company_id = 7            // 名义初品客服ID为7

// const http_target_test = 'http://mycpnew.test.ec-cloudtech.com' // 后台接口
const http_target_test = 'http://mycptest.ec-cloudtech.com' // 后台接口
// const ws_target_test = 'ws://imwstest.ec-cloudtech.com'; // im
const ws_target_test = 'ws://mycptestim.ec-cloudtech.com/ws/customer_service'; // 老的im
const ws_send_test = 'http://mycptestim.ec-cloudtech.com' // im send
const qiniu_target_test = 'http://up-z2.qiniup.com/' // 七牛请求地址
const qiniu_img_url_test = 'https://img.bingovip.shop/' // 七牛资源地址

const http_target = 'http://mycp.ec-cloudtech.com'; // 后台接口
// const ws_target = 'ws://imws.ec-cloudtech.com'; // im
const ws_target = 'ws://mycpim.ec-cloudtech.com/ws/customer_service'; // 老的im
const ws_send = 'http://mycpim.ec-cloudtech.com' // im send
const qiniu_target = 'http://up-z2.qiniup.com/' // 七牛请求地址
const qiniu_img_url = 'https://img.bingovip.shop/' // 七牛资源地址
module.exports = {
    proxyList: {
        '/v1':{
            target: http_target_test,
            changeOrigin: true
        },
        '/v2': {
            target: http_target_test,
            changeOrigin: true
        },
        '/v3': {
            target: http_target_test,
            changeOrigin: true
        }
    },
    company_id,
    // tips：php未反解加密方式，调试先写死token
    ws: `${service.ws_target}?token=`,
    qiniu_target,
    qiniu_img_url,
    ws_send,

    ws_test: `${service.ws_target_test}?token=`,
    qiniu_target_test,
    qiniu_img_url_test,
    ws_send_test,

    isTest () {
        return window.location.origin.indexOf('test') !== -1 || window.location.origin.indexOf('localhost') !== -1
    },
    getOrigin (name) {
        if (this.isTest()) {
            return this[`${name}_test`]
        }
        return this[`${name}`]
    }
};
