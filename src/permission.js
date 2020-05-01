// Progress 进度条
import NProgress from 'nprogress';
// Progress 进度条样式
import 'nprogress/nprogress.css';
import router from './router';
import store from './store';
import { Token } from '@/OMS/utils';

// 不重定向白名单
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
    const { name, path } = to;
    NProgress.start();
    if (Token.getToken()) {
        // 仅在促销模块 && 未获取过商品列表情况下重新后台拉取商品数据
        // if(path.includes('activity')) await store.dispatch('product/getAllGoods');
        if(!store.state.product.isGetGoods) store.dispatch('product/getAllGoods');
        // 未获取过商品分类情况下重新后台拉取商品分类数据
        // await store.dispatch('product/getAllCategories');
        if(!store.state.product.isGetCategories) await store.dispatch('product/getAllCategories');
        if (path === '/login') {
            next({ path: '/' });
        } else if (!store.state.user.isGetUserInfo) {
            // 拉取用户信息
            try {
                await store.dispatch('user/GetUserInfo'); 
                await store.dispatch('permission/GenerateRoutes');
                router.addRoutes(store.state.permission.addRouters);
                // hack方法 确保addRoutes已完成
                next({ ...to, replace: true });
            } catch (err) {
                store.dispatch('user/LogOut', true);
            }
        } else {
            next();
            NProgress.done();
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        next();
        NProgress.done();
    } else {
        next('/login');
        NProgress.done();
    }
});

router.afterEach(() => {
    NProgress.done();
});
