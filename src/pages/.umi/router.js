import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from 'D:/project/ecs-web/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__index" */ '../../layouts/index.js'),
          LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
            .default,
        })
      : require('../../layouts/index.js').default,
    routes: [
      {
        path: '/404',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../404.js').default,
      },
      {
        path: '/customerService/conversation',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__conversation__model.js' */ 'D:/project/ecs-web/src/pages/customerService/conversation/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__conversation__index" */ '../customerService/conversation/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/conversation/index.js').default,
      },
      {
        path: '/customerService/dataManage',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__dataManage__model.js' */ 'D:/project/ecs-web/src/pages/customerService/dataManage/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__dataManage__index" */ '../customerService/dataManage/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/dataManage/index.js').default,
      },
      {
        path: '/customerService/dispatchManage',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__dispatchManage__model.js' */ 'D:/project/ecs-web/src/pages/customerService/dispatchManage/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__dispatchManage__index" */ '../customerService/dispatchManage/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/dispatchManage/index.js').default,
      },
      {
        path: '/customerService/replayManage',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__replayManage__model.js' */ 'D:/project/ecs-web/src/pages/customerService/replayManage/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__replayManage__index" */ '../customerService/replayManage/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/replayManage/index.js').default,
      },
      {
        path: '/customerService/workOrderDetail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__workOrderDetail__model.js' */ 'D:/project/ecs-web/src/pages/customerService/workOrderDetail/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__workOrderDetail__index" */ '../customerService/workOrderDetail/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/workOrderDetail/index.js').default,
      },
      {
        path: '/customerService/workOrderList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__workOrderList__model.js' */ 'D:/project/ecs-web/src/pages/customerService/workOrderList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__workOrderList__index" */ '../customerService/workOrderList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/workOrderList/index.js').default,
      },
      {
        path: '/customerService/workOrderTypes',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__customerService__workOrderTypes__model.js' */ 'D:/project/ecs-web/src/pages/customerService/workOrderTypes/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__customerService__workOrderTypes__index" */ '../customerService/workOrderTypes/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../customerService/workOrderTypes/index.js').default,
      },
      {
        path: '/dashboard',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__dashboard__model.js' */ 'D:/project/ecs-web/src/pages/dashboard/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__dashboard__index" */ '../dashboard/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../dashboard/index.js').default,
      },
      {
        path: '/Error',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Error" */ '../Error.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../Error.js').default,
      },
      {
        path: '/finance/afterSaleList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__afterSaleList__model.js' */ 'D:/project/ecs-web/src/pages/finance/afterSaleList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__afterSaleList__index" */ '../finance/afterSaleList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/afterSaleList/index.js').default,
      },
      {
        path: '/finance/chargeSystem',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__chargeSystem__model.js' */ 'D:/project/ecs-web/src/pages/finance/chargeSystem/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__chargeSystem__index" */ '../finance/chargeSystem/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/chargeSystem/index.js').default,
      },
      {
        path: '/finance/detailAccount',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__detailAccount__model.js' */ 'D:/project/ecs-web/src/pages/finance/detailAccount/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__detailAccount__index" */ '../finance/detailAccount/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/detailAccount/index.js').default,
      },
      {
        path: '/finance/financeList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__financeList__model.js' */ 'D:/project/ecs-web/src/pages/finance/financeList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__financeList__index" */ '../finance/financeList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/financeList/index.js').default,
      },
      {
        path: '/finance/productProfitList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__productProfitList__model.js' */ 'D:/project/ecs-web/src/pages/finance/productProfitList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__productProfitList__index" */ '../finance/productProfitList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/productProfitList/index.js').default,
      },
      {
        path: '/finance/returnProfitList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__returnProfitList__model.js' */ 'D:/project/ecs-web/src/pages/finance/returnProfitList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__returnProfitList__index" */ '../finance/returnProfitList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/returnProfitList/index.js').default,
      },
      {
        path: '/finance/supplierDetails',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__supplierDetails__model.js' */ 'D:/project/ecs-web/src/pages/finance/supplierDetails/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__supplierDetails__index" */ '../finance/supplierDetails/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/supplierDetails/index.js').default,
      },
      {
        path: '/finance/supplierList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__supplierList__model.js' */ 'D:/project/ecs-web/src/pages/finance/supplierList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__supplierList__index" */ '../finance/supplierList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/supplierList/index.js').default,
      },
      {
        path: '/finance/totalAccount',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__totalAccount__model.js' */ 'D:/project/ecs-web/src/pages/finance/totalAccount/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__totalAccount__index" */ '../finance/totalAccount/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/totalAccount/index.js').default,
      },
      {
        path: '/finance/transferList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__transferList__model.js' */ 'D:/project/ecs-web/src/pages/finance/transferList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__transferList__index" */ '../finance/transferList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/transferList/index.js').default,
      },
      {
        path: '/finance/userAccountList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__finance__userAccountList__model.js' */ 'D:/project/ecs-web/src/pages/finance/userAccountList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__finance__userAccountList__index" */ '../finance/userAccountList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../finance/userAccountList/index.js').default,
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../index.js').default,
      },
      {
        path: '/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__login__model.js' */ 'D:/project/ecs-web/src/pages/login/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../login/index.js').default,
      },
      {
        path: '/marketing/couponAdd',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__marketing__couponAdd__model.js' */ 'D:/project/ecs-web/src/pages/marketing/couponAdd/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__marketing__couponAdd__index" */ '../marketing/couponAdd/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../marketing/couponAdd/index.js').default,
      },
      {
        path: '/marketing/couponList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__marketing__couponList__model.js' */ 'D:/project/ecs-web/src/pages/marketing/couponList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__marketing__couponList__index" */ '../marketing/couponList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../marketing/couponList/index.js').default,
      },
      {
        path: '/order/afterSale',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__order__afterSale__model.js' */ 'D:/project/ecs-web/src/pages/order/afterSale/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__order__afterSale__index" */ '../order/afterSale/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../order/afterSale/index.js').default,
      },
      {
        path: '/order/orderDetail/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__order__orderDetail___id" */ '../order/orderDetail/$id.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../order/orderDetail/$id.js').default,
      },
      {
        path: '/order/orderList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__order__orderList__model.js' */ 'D:/project/ecs-web/src/pages/order/orderList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__order__orderList__index" */ '../order/orderList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../order/orderList/index.js').default,
      },
      {
        path: '/order/refundAudit',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__order__refundAudit__model.js' */ 'D:/project/ecs-web/src/pages/order/refundAudit/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__order__refundAudit__index" */ '../order/refundAudit/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../order/refundAudit/index.js').default,
      },
      {
        path: '/order/sendGoods',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__order__sendGoods__model.js' */ 'D:/project/ecs-web/src/pages/order/sendGoods/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__order__sendGoods__index" */ '../order/sendGoods/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../order/sendGoods/index.js').default,
      },
      {
        path: '/permissions',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__permissions__models__member.js' */ 'D:/project/ecs-web/src/pages/permissions/models/member.js').then(
                  m => {
                    return { namespace: 'member', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__permissions__models__security.js' */ 'D:/project/ecs-web/src/pages/permissions/models/security.js').then(
                  m => {
                    return { namespace: 'security', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__permissions__index" */ '../permissions/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../permissions/index.js').default,
      },
      {
        path: '/product/addProduct',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__addProduct__model.js' */ 'D:/project/ecs-web/src/pages/product/addProduct/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__addProduct__index" */ '../product/addProduct/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/addProduct/index.js').default,
      },
      {
        path: '/product/brandsList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__brandsList__model.js' */ 'D:/project/ecs-web/src/pages/product/brandsList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__brandsList__index" */ '../product/brandsList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/brandsList/index.js').default,
      },
      {
        path: '/product/categoryList/constant',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__categoryList__model.js' */ 'D:/project/ecs-web/src/pages/product/categoryList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__categoryList__constant" */ '../product/categoryList/constant.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/categoryList/constant.js').default,
      },
      {
        path: '/product/categoryList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__categoryList__model.js' */ 'D:/project/ecs-web/src/pages/product/categoryList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__categoryList__index" */ '../product/categoryList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/categoryList/index.js').default,
      },
      {
        path: '/product/labelList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__labelList__model.js' */ 'D:/project/ecs-web/src/pages/product/labelList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__labelList__index" */ '../product/labelList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/labelList/index.js').default,
      },
      {
        path: '/product/norms',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__norms__model.js' */ 'D:/project/ecs-web/src/pages/product/norms/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__norms__index" */ '../product/norms/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/norms/index.js').default,
      },
      {
        path: '/product/productList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__productList__model.js' */ 'D:/project/ecs-web/src/pages/product/productList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__productList__index" */ '../product/productList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/productList/index.js').default,
      },
      {
        path: '/product/supplierEdit/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__supplierEdit__model.js' */ 'D:/project/ecs-web/src/pages/product/supplierEdit/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__supplierEdit___id" */ '../product/supplierEdit/$id.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/supplierEdit/$id.js').default,
      },
      {
        path: '/product/supplierList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__product__supplierList__model.js' */ 'D:/project/ecs-web/src/pages/product/supplierList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__product__supplierList__index" */ '../product/supplierList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../product/supplierList/index.js').default,
      },
      {
        path: '/resetPassword',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__resetPassword__index" */ '../resetPassword/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../resetPassword/index.js').default,
      },
      {
        path: '/shipping/delivery',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__shipping__delivery__model.js' */ 'D:/project/ecs-web/src/pages/shipping/delivery/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__shipping__delivery__index" */ '../shipping/delivery/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shipping/delivery/index.js').default,
      },
      {
        path: '/shop/decoration/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shop__decoration___id" */ '../shop/decoration/$id.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shop/decoration/$id.js').default,
      },
      {
        path: '/shop/pageList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__shop__pageList__model.js' */ 'D:/project/ecs-web/src/pages/shop/pageList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__shop__pageList__index" */ '../shop/pageList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shop/pageList/index.js').default,
      },
      {
        path: '/shopInformation/authentication',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shopInformation__authentication__index" */ '../shopInformation/authentication/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shopInformation/authentication/index.js').default,
      },
      {
        path: '/shopInformation',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shopInformation__index" */ '../shopInformation/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shopInformation/index.js').default,
      },
      {
        path: '/shopInformation/operate',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shopInformation__operate__index" */ '../shopInformation/operate/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shopInformation/operate/index.js').default,
      },
      {
        path: '/shopInformation/shop',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shopInformation__shop__index" */ '../shopInformation/shop/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shopInformation/shop/index.js').default,
      },
      {
        path: '/shopInformation/unClassIndex',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__shopInformation__unClassIndex" */ '../shopInformation/unClassIndex.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../shopInformation/unClassIndex.js').default,
      },
      {
        path: '/statistics/demo/getBarOptions1',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getBarOptions1" */ '../statistics/demo/getBarOptions1.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getBarOptions1.js').default,
      },
      {
        path: '/statistics/demo/getBarOptions2',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getBarOptions2" */ '../statistics/demo/getBarOptions2.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getBarOptions2.js').default,
      },
      {
        path: '/statistics/demo/getLineOptions1',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getLineOptions1" */ '../statistics/demo/getLineOptions1.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getLineOptions1.js').default,
      },
      {
        path: '/statistics/demo/getLineOptions2',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getLineOptions2" */ '../statistics/demo/getLineOptions2.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getLineOptions2.js').default,
      },
      {
        path: '/statistics/demo/getMapOptions',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getMapOptions" */ '../statistics/demo/getMapOptions.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getMapOptions.js').default,
      },
      {
        path: '/statistics/demo/getPieOptions1',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getPieOptions1" */ '../statistics/demo/getPieOptions1.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getPieOptions1.js').default,
      },
      {
        path: '/statistics/demo/getPieOptions2',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__getPieOptions2" */ '../statistics/demo/getPieOptions2.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/getPieOptions2.js').default,
      },
      {
        path: '/statistics/demo',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__statistics__demo__index" */ '../statistics/demo/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../statistics/demo/index.js').default,
      },
      {
        path: '/system/agreement',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__agreement__model.js' */ 'D:/project/ecs-web/src/pages/system/agreement/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__agreement__index" */ '../system/agreement/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../system/agreement/index.js').default,
      },
      {
        path: '/system/integralSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__system__integralSet__index" */ '../system/integralSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../system/integralSet/index.js').default,
      },
      {
        path: '/system/rebateSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__system__rebateSet__index" */ '../system/rebateSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../system/rebateSet/index.js').default,
      },
      {
        path: '/system/tradeSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__system__tradeSet__model.js' */ 'D:/project/ecs-web/src/pages/system/tradeSet/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__system__tradeSet__index" */ '../system/tradeSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../system/tradeSet/index.js').default,
      },
      {
        path: '/system/userSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__system__userSet__index" */ '../system/userSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../system/userSet/index.js').default,
      },
      {
        path: '/user/accountSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__accountSet__index" */ '../user/accountSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/accountSet/index.js').default,
      },
      {
        path: '/user/userAudit',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userAudit__model.js' */ 'D:/project/ecs-web/src/pages/user/userAudit/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userAudit__index" */ '../user/userAudit/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userAudit/index.js').default,
      },
      {
        path: '/user/userDetail/:id',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userDetail__model.js' */ 'D:/project/ecs-web/src/pages/user/userDetail/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userDetail___id" */ '../user/userDetail/$id.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userDetail/$id.js').default,
      },
      {
        path: '/user/userGroup',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userGroup__model.js' */ 'D:/project/ecs-web/src/pages/user/userGroup/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userGroup__index" */ '../user/userGroup/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userGroup/index.js').default,
      },
      {
        path: '/user/userLevel',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userLevel__model.js' */ 'D:/project/ecs-web/src/pages/user/userLevel/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userLevel__index" */ '../user/userLevel/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userLevel/index.js').default,
      },
      {
        path: '/user/userLevelSet',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__userLevelSet__index" */ '../user/userLevelSet/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userLevelSet/index.js').default,
      },
      {
        path: '/user/userLevelSet/rebatePattern',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__userLevelSet__rebatePattern" */ '../user/userLevelSet/rebatePattern.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userLevelSet/rebatePattern.js').default,
      },
      {
        path: '/user/userLevelSet/upgradeCondition',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__userLevelSet__upgradeCondition" */ '../user/userLevelSet/upgradeCondition.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userLevelSet/upgradeCondition.js').default,
      },
      {
        path: '/user/userList',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__user__userList__model.js' */ 'D:/project/ecs-web/src/pages/user/userList/model.js').then(
                  m => {
                    return { namespace: 'model', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__user__userList__index" */ '../user/userList/index.js'),
              LoadingComponent: require('D:/project/ecs-web/src/components/Loader/Loader')
                .default,
            })
          : require('../user/userList/index.js').default,
      },
      {
        component: () =>
          React.createElement(
            require('D:/project/ecs-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
      },
    ],
    File: '全局布局入口',
  },
  {
    component: () =>
      React.createElement(
        require('D:/project/ecs-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
