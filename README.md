# ryg-admin

#### 项目介绍


>   router

    分为asyncMap（通过权限异步添加的路由并左侧/顶部导航栏匹配）、constantRouterMap（固定路由，eg:404、login）
    
>   components

    全局组建，其中常用组件已挂载全局，直接使用，eg：SvgIcon.vue，Search.vue
    其余组件按需引入eg：chart、richTextEditor
    
>   directive

    常用指令eg：v-img，组建内权限v-permission
    
>   filters

    全局filter，目前主要过滤空数据
    
>   icons

    本项目全部使用[iconfont](http://www.iconfont.cn/)symbol方式使用，目的是为了向后兼容自定义图标的方式
    以后若自定义图标可兼容，简单易用的svg-icon（使用的svg-sprint-loader）
    使用 eg:<svg-icon icon-name="test"/>
    
>   permission
    
    登录权限
    路由权限
    操作权限
    
>   mixin

    全局混合
        
>   fileUpload

    结合element封装上传组件

>   常用函数utils
    
>   代理proxy

#### 安装教程

    npm i && npm run oms:init

#### 开发环境

    npm run dev
    
#### 测试环境

    npm run build:test 

#### 生产环境

    npm run build:prod 

   >当前打包已关闭map文件的生成
    
   >前打包已开启gzip文件打包

#### 查看report

    npm run build --report


