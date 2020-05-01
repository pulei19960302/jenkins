import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';

// modules 自动注册
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./modules', true, /\.js$/);
const modules = {};

requireAll(req).map((md) => {
    modules[md.default.name] = md.default;
    // 如果非要定义modules内的mutations，做浅拷贝兼容
    if(modules[md.default.name].mutations) {
        modules[md.default.name].mutations = {
            ...modules[md.default.name].mutations,
            ...mutations
        }
        return;
    }
    modules[md.default.name].mutations = mutations;
});
Vue.use(Vuex);
const store = new Vuex.Store({
    modules,
    getters
});

export default store;
