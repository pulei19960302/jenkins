/**
 * Created by hetingfeng on 2018/11/20.
 */
import axios from '../axios';

class User{
    constructor() {
        // 轮播管理
        this.banner = {
            export: '/banner/export',
            list: '/banner/list',
            detail: '/banner/detail',
            edit: '/banner/edit',
            del: '/banner/del',
            add: '/banner/add',
        };
        // 运费模板
        this.freight_template = {
            export: '/freight-template/export',
            list: '/freight-template/list',
            detail: '/freight-template/detail',
            edit: '/freight-template/edit',
            add: '/freight-template/add',
            del: '/freight-template/del-all',
        };
        // 快递公司
        this.express = {
            export: '/express/export',
            list: '/express/list',
            detail: '/express/detail',
            edit: '/express/edit',
            set_status: '/express/set-status',
            add: '/express/add',
            del: '/express/del',
        };
        // 配置
        this.config = {
            export: '/config/export',
            list: '/config/list',
            save: '/config/save',
            save2: '/config/save2',
        };
        // 运费险模板
        this.freight_insurance = {
            export: '/freight-insurance/export',
            list: '/freight-insurance/list',
            detail: '/freight-insurance/detail',
            edit: '/freight-insurance/edit',
            set_status: '/freight-insurance/set-status',
            add: '/freight-insurance/add',
            del: '/freight-insurance/del'
        };
        // 商户号管理
        this.merchant_setting = {
            info: '/merchant-account/detail',
            list: '/merchant-account/list',
            edit: '/merchant-account/add',
            delete: '/merchant-account/del',
            setEnable: '/merchant-account/set-enable',
        };
        // 专题/活动板式设置
        this.specialActivity = {
            list: '/special-activity/list',
            delete: '/special-activity/list',
            add: '/special-activity/add',
            edit: '/special-activity/edit',
            editStatus: '/special-activity/edit-status' // 板式状态修改
        };
    }

    //轮播管理
    bannerList(params) {
        return axios(this.banner.list, { method: 'get', params });
    }
    bannerDetail(params) {
        return axios(this.banner.detail, { method: 'get', params });
    }
    bannerEdit(params) {
        return axios(this.banner.edit, { method: 'post', params });
    }
    bannerDel(params) {
        return axios(this.banner.del, { method: 'post', params });
    }
    bannerAdd(params) {
        return axios(this.banner.add, { method: 'post', params });
    }

    // 运费模板
    addFreightTemplate(params) {
        return axios(this.freight_template.add, { method: 'post', params });
    }
    editFreightTemplate(params) {
        return axios(this.freight_template.edit, { method: 'post', params });
    }
    delFreightTemplate(params) {
        return axios(this.freight_template.del, { method: 'post', params });
    }
    getFreightTemplateList(params) {
        return axios(this.freight_template.list, { method: 'get', params });
    }
    getFreightTemplateDetail(params) {
        return axios(this.freight_template.detail, { method: 'get', params });
    }

    // 快递公司
    addExpress(params) {
        return axios(this.express.add, { method: 'post', params });
    }
    editExpress(params) {
        return axios(this.express.edit, { method: 'post', params });
    }
    setStatusExpress(params) {
        return axios(this.express.set_status, { method: 'post', params });
    }
    delExpress(params) {
        return axios(this.express.del, { method: 'post', params });
    }
    getExpressList(params) {
        return axios(this.express.list, { method: 'get', params });
    }
    getExpressDetail(params) {
        return axios(this.express.detail, { method: 'get', params });
    }

    // 平台配置
    getConfigList(params) {
        return axios(this.config.list, { method: 'get', params });
    }
    saveConfig(params) {
        return axios(this.config.save, { method: 'post', params });
    }
    saveConfig2(params) {
        return axios(this.config.save2, { method: 'post', params });
    }

    // 平台配置
    getInsuranceList(params) {
        return axios(this.freight_insurance.list, { method: 'get', params });
    }
    addInsurance(params) {
        return axios(this.freight_insurance.add, { method: 'post', params });
    }
    editInsurance(params) {
        return axios(this.freight_insurance.edit, { method: 'post', params });
    }
    setStatusInsurance(params) {
        return axios(this.freight_insurance.set_status, { method: 'post', params });
    }
    delInsurance(params) {
        return axios(this.freight_insurance.del, { method: 'post', params });
    }
    insuranceDetail(params) {
        return axios(this.freight_insurance.detail, { method: 'get', params });
    }
    // 商户号管理
    getMerchantInfo(params) {
        return axios(this.merchant_setting.info, { method: 'get', params });
    }
    getMerchantList(params) {
        return axios(this.merchant_setting.list, { method: 'get', params });
    }
    editMerchant(params) {
        return axios(this.merchant_setting.edit, { method: 'post', params });
    }
    deleteMerchant(params) {
        return axios(this.merchant_setting.delete, { method: 'get', params });
    }
    setEnableMerchant(params) {
        return axios(this.merchant_setting.setEnable, { method: 'post', params });
    }
    // 专题/活动设置
    getSpecialActivityList(params) {
        return axios(this.specialActivity.list, { method: 'get', params });
    }
    addSpecialActivity(params) {
        return axios(this.specialActivity.add, { method: 'post', params });
    }
    // deleteSpecialActivity(params) {
    //     return axios(this.specialActivity.delete, { method: 'delete', params });
    // }
    editSpecialActivity(params) {
        return axios(this.specialActivity.edit, { method: 'post', params });
    }
    editStatusSpecialActivity(params) {
        return axios(this.specialActivity.editStatus, { method: 'post', params });
    }
};
export default {
    name: 'setting',
    module: new User()
};

