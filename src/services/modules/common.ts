export default {
    getQiniuToken: 'POST /public/get-qi-niu-token',  // 七牛token
    getEnumeList: 'POST /sysconfig/get-config', // 枚举接口
    getAreaList:'/area/list', //获取省市区
    getFreightTemplate: 'POST /freight/get-template', // 获取运费模板
    getInsurance: 'POST /insurance/get-page-list', // 获取运费险列表
    getExpressList: '/express/list',  // 获取快递公司
    getAllAreas: 'POST /area/get-all-area'//获取省市区(包括华东华中等划分)
}
