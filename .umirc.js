/**
 * @File: Umi 配置
 * @Docs：https://umijs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
 */

import { resolve } from 'path'
import { http_target, im_server } from './src/services/target'

export default {
  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸
  targets: { ie: 9 },
  treeShaking: true,
  history: 'hash',
  publicPath: process.env.UMI_ENV === 'prod' ? '/dist/' : '',
  hash: true,
  esbuild: {},
  plugins: [
    [
      // https://umijs.org/zh/plugin/umi-plugin-react.html#%E5%AE%89%E8%A3%85
      'umi-plugin-react',
      {
        esbuild: {},
        locale: {
          default: 'zh-CN', // 默认语言 zh-CN
          baseNavigator: false, // 为 true 时，用 navigator.language 的值作为默认语言
          antd: true // 是否启用 antd 的 <LocaleProvider />
        },
        dva: { immer: true },
        antd: true, // 启用后自动配置 babel-plugin-import 实现 antd, antd-mobile 和 antd-pro 的按需编译，并且内置 antd, antd-mobile 依赖
        dynamicImport: { // 实现路由级的动态加载（code splitting）
          webpackChunkName: true,
          loadingComponent: './components/Loader/Loader',
        },
        routes: { // 基于 umi-plugin-routes 实现，用于批量修改路由
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /constants\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
          update: routes => routes
        },
        dll: { // 通过 webpack 的 dll 插件预打包一份 dll 文件来达到二次启动提速的目的
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        // pwa: {
        //   manifestOptions: {
        //     srcPath: 'manifest.json'
        //   },
        // }
      },
    ],
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: './config/theme.config.js',
  // Webpack Configuration
  proxy: [
    {
      context: ['/admin','/v1'],
      target: http_target,
      changeOrigin: true
    },
    {
      context: ['/*\.xlsx', '/*export'],
      target: http_target,
      changeOrigin: true
    },
    {
      context: ['/im-server/'],
      target: im_server,
      changeOrigin: true,
    }
  ],
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
    assets: resolve(__dirname, './src/assets'),
    '@':resolve(__dirname, './src'),
  },
  extraBabelPlugins: [ // 定义额外需要做 babel 转换的文件匹配列表
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}
