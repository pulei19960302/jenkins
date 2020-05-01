## 这可能是世界上最伟大的项目

### 请求封装说明

> 用法

使用 `webpack` 的 `require.context` 整合常量文件最终生成系列可执行函数挂载到全局 `$api`

```javascript
// 你的常量定义在这里
services/modules/xx.ts
// 例如
export default {
    foo:'get /get/foo', // get 可省略 可以改成 foo:'/get/foo',
    bar:'post /post/bar'
}
```
最终我们会得到 `$api.xx.foo` 的可执行函数，它会发起请求并返回一个 `promise`

另外我们还会得到 `$api.xx.foo.permission` 的可执行函数，它会返回一个布尔值，如果为 `false` 代表该用户没有访问该接口的权限

> 请求参数举例

```javascript

$api.xx.foo(
    {id:1}, // 请求参数
    {       // 配置参数 非必填
        success:true, // 开启请求后的成功提示，默认提示'操作成功' 可加传 successText 自定义
        loading:true, // 开启请求 loading 是整个页面的大 loading 不建议使用
        loadingFn:fn, // 可使用这个做精细的 loading 这个function会在请求前调用，fn(true)，并在请求完成或请求报错后再次调用，fn(false) 可利用这个布尔值控制适合你的 loading
        cache:true    // 开启缓存黑魔法
    }
)

// 更多参数参见 services/request.ts

```
请求和权限相关有啥问题可联系 `肖浪 438944342@qq.com`

### 现有公用组件说明

- BtnGroup `按钮组`
- ChooseAddress `地址级联选择`
- ColorPicker `颜色拾取器`
- Columns `订单列表风格表格的列表标题`
- CommonTable `糅合分页、搜索、表格、批量操作的组件`
- Editor `富文本编辑器`
- Export `导出`
- Import `导入`
- IconFont `字体图标`
- InputNumberGroup `数字输入组组件，如金额的输入`
- InputRange `范围输入组件`
- LinesEllipsis `文本过长省略号`
- Loader `页面初始大 loading`
- MutipulBtns `列表批量操作按钮组`
- PageTitle `遵从 UI 规范的页面标题 自动匹配路由标题`
- Pagination `分页组件`
- PreviewImg `图片预览组件`
- ScrollBar `滚动组件？？`
- SearchForm `搜索组件`
- TableDropDown `表格更多操作的下拉`
- TabsBar `tabs`
- UploadImg `图片上传`
- FSwitch `好用版 switch `

### 项目红线

- 本项目禁止使用`react 17.x`不再支持的生命周期(即带'will'的生命周期)

如`componentWillReceiveProps` 建议使用 `getDerivedStateFromProps` 代替

- 禁止对 `javascript` 内置对象的 `prototype` 挂载任何东西

- 禁止私自全局覆盖 `ant-design` 样式，要改只能通过 `themes/default`对其变量进行修改，如果确实有需求，只能通过 `css作用域` 对当前尽量小的容器内进行 `ant-design` 样式覆盖，避免影响到他人。

### 交互规范
- 列表加载时loading
- 提交类的按钮，在请求接口时加上loading，接口返回或异常取消按钮loading

### 提交规范
- 提交代码需写明注释
- Commit message格式 （feat：新功能 fix：修补bug）



