// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// 重置样式
import 'normalize.css/normalize.css';
// 引入并重置ElementUI
import ElementUI, { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss';
// router
import router from './router';
// vuex
import store from './store';
// 统一时间处理moment插件
import moment from 'moment';

import App from './App';

// 引入filter
import * as filters from '@/OMS/filters';
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


// 引入api
import api from './api';
// 引入socket
import VueNativeSock from 'vue-native-websocket';
import { Token } from '@/OMS/utils';
const proxyConfig = require("./proxyConfig");
let userToken='';
let checkToken=setInterval(()=>{
    if(Token.getToken()!=undefined && store.state.user.userInfo.service_type){
        userToken=Token.getToken()
        let wsUrl = (proxyConfig.getOrigin ? proxyConfig.getOrigin('ws') : proxyConfig.ws)+userToken+`&type=${store.state.user.userInfo.service_type}`;
        Vue.use(VueNativeSock, wsUrl, {
            connectManually: true,
            // 自动重连
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 5000,
            store
        })
        clearInterval(checkToken);
    }
},1000)



// 引入icon
import './icons'; // svg下的iconfont
if (process.env.NODE_ENV !== 'development') require('./icons/iconfont') // iconfont生成的Symbol图标，用法类似，仅仅在非开发环境已经本地下载后引入

// 引入公用组件
import common from '@/OMS/mycpGlobalComponents';
Vue.use(common);

// 未与后端联调前，引入mock模拟数据
// require('./mock')

// 权限控制
import './permission'; // 登录，路由生成等
import directive from '@/OMS/directive'; // 操作
Vue.use(directive);

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });

// 挂载全局方法
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$api', { value: api });
Object.defineProperty(Vue.prototype, '$loading ', { value: Loading });
// 编辑tab切换更新
Vue.prototype.$refreshTab = ()=>{ store.state.tagsView.tabKey++ }  

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
