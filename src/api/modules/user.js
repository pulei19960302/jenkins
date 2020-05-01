/**
 * Created by hetingfeng on 2018/11/20.
 */

import axios from '../axios';

class User {
    constructor() {
        // 用户管理
        this.userManage = {
            export: '/v3/member/export',
            list: '/member/list',
            detail: '/member/detail',
            edit: '/member/edit',
            active: '/member/set-status', //启用
            del: '/member/del',//删除
            editUserType: '/member/edit-user-type',
            storeAudit: '/member/store-audit',
            addressList: '/member-address/list',
            setstatus: '/member/set-status',
            checkpwd: '/member/check-pwd',
            storeselect: '/member/store-select',
            changestore: '/member/change-store',
            teamdetail: '/member/team-detail',
            partnertype: '/member/edit-partner',
            changeteam: '/member/change-team',
            partneruser: '/member/partner-user',
            changegeneralize: '/member/change-generalize',
            integralrecord: '/integral-record/list',
            updateintegral: '/integral-record/update-integral',
            integralType: '/integral-record/type',
            modifyUserId:'/member/update-third'
        };
        // 群管理
        this.group = {
            export: '/member-group/export',
            list: '/member-group/list',
            detail: '/member-group/detail',
            edit: '/member-group/edit',
            del: '/member-group/del',
            add: '/member-group/add',
            memberlist: '/member-group/member-list',
            memberpush: '/member-group/push',
            memberpop: '/member-group/pop',
            membergroup: '/member-group/members',
        };
        //白银
        this.store = {
            export: '/member-store/export',
            list: '/member-store/list',
            setStatus: '/member-store/set-status',
            check: '/member/check-store',
            storeUser: '/member/store-user',
        };
        // 达人
        this.celebrity = {
            export: '/member-celebrity/export',
            list: '/member-celebrity/list',
        };
        // 合伙人
        this.partner = {
            export: '/member-partner/export',
            list: '/member-partner/list',
            setStatus: '/member-partner/set-status',
            setstandard: '/member-partner/set-standard',
        }
        // 任务管理
        this.task = {
            export: '/task/export',
            list: '/task/list',
            edit: '/task/edit',
            del: '/task/del',
            setstatus: ' /task/set-status',
            typelist: '/task/type-list',
        };
        this.export = {
            memberexport: '/member/export', //普通粉丝
            memberstore: '/member-store/export', //白银
            memberpartner: '/member-partner/export', //平台合伙人
        }
        // 推荐码
        this.recommendCode = {
            list: '/recommendation-code/list',
            status: '/recommendation-code/set-status'
        }
    }
    modifyUserId(params){
        return axios(this.userManage.modifyUserId, {
            method: 'post',
            params
        });
    }
    recommendCodeStatus(params) {
        return axios(this.recommendCode.status, {
            method: 'post',
            params
        });
    }
    recommendCodeList(params) {
        return axios(this.recommendCode.list, {
            method: 'get',
            params
        });
    }
    // 任务管理
    taskList(params) {
        return axios(this.task.list, {
            method: 'get',
            params
        });
    }
    taskEdit(params) {
        return axios(this.task.edit, {
            method: 'post',
            params
        });
    }
    taskDel(params) {
        return axios(this.task.del, {
            method: 'post',
            params
        });
    }
    taskSetStatus(params) {
        return axios(this.task.setstatus, {
            method: 'post',
            params
        });
    }
    typeList(params) {
        return axios(this.task.typelist, {
            method: 'get',
            params
        });
    }

    getUserManageList(params) {
        return axios(this.userManage.list, {
            method: 'get',
            params
        });
    }
    getUserManageDetail(params) {
        return axios(this.userManage.detail, {
            method: 'get',
            params
        });
    }
    getUserManageAddressList(params) {
        return axios(this.userManage.addressList, {
            method: 'get',
            params
        });
    }


    userEdit(params) {
        return axios(this.userManage.edit, {
            method: 'post',
            params
        });
    }
    userSetStatus(params) {
        return axios(this.userManage.setstatus, {
            method: 'post',
            params
        });
    }
    Userdel(params) {
        return axios(this.userManage.del, {
            method: 'post',
            params
        });
    }


    storeAudit(params) {
        return axios(this.userManage.storeAudit, {
            method: 'post',
            params
        });
    }
    editUserType(params) {
        return axios(this.userManage.editUserType, {
            method: 'post',
            params
        });
    }
    checkPwd(params) {
        return axios(this.userManage.checkpwd, {
            method: 'post',
            params
        });
    }
    partnerType(params) {
        return axios(this.userManage.partnertype, {
            method: 'post',
            params
        });
    }
    changeteam(params) {
        return axios(this.userManage.changeteam, {
            method: 'post',
            params
        });
    }
    partneruser(params) {
        return axios(this.userManage.partneruser, {
            method: 'get',
            params
        });
    }
    storeSelect(params) {
        return axios(this.userManage.storeselect, {
            method: 'get',
            params
        });
    }
    changeStore(params) {
        return axios(this.userManage.changestore, {
            method: 'post',
            params
        });
    }
    teamDetail(params) {
        return axios(this.userManage.teamdetail, {
            method: 'get',
            params
        });
    }
    changegeneralize(params) {
        return axios(this.userManage.changegeneralize, {
            method: 'post',
            params
        });
    }
    integraLrecord(params) {
        return axios(this.userManage.integralrecord, {
            method: 'get',
            params
        });
    }
    integralType(params) {
        return axios(this.userManage.integralType, {
            method: 'get',
            params
        });
    }
    updateintegral(params) {
        return axios(this.userManage.updateintegral, {
            method: 'post',
            params
        });
    }
    // AddAdminGroup(params) {
    //     return axios(this.admincp_group.add, { method: 'post', params });
    // }
    // EditAdminGroup(params) {
    //     return axios(this.admincp_group.edit, { method: 'post', params });
    // }
    // DelAdminGroup(params) {
    //     return axios(this.admincp_group.del, { method: 'post', params });
    // }
    //群管理
    groupList(params) {
        return axios(this.group.list, {
            method: 'get',
            params
        });
    }
    groupDetail(params) {
        return axios(this.group.detail, {
            method: 'get',
            params
        });
    }
    groupEdit(params) {
        return axios(this.group.edit, {
            method: 'post',
            params
        });
    }
    groupDel(params) {
        return axios(this.group.del, {
            method: 'post',
            params
        });
    }
    groupAdd(params) {
        return axios(this.group.add, {
            method: 'post',
            params
        });
    }
    groupmemberlist(params) {
        return axios(this.group.memberlist, {
            method: 'get',
            params
        });
    }
    groupmemberPush(params) {
        return axios(this.group.memberpush, {
            method: 'post',
            params
        });
    }
    groupmemberPop(params) {
        return axios(this.group.memberpop, {
            method: 'post',
            params
        });
    }
    memberGroup(params) {
        return axios(this.group.membergroup, {
            method: 'get',
            params
        });
    }
    //白银
    storelist(params) {
        return axios(this.store.list, {
            method: 'get',
            params
        });
    }
    storeSetStatus(params) {
        return axios(this.store.setStatus, {
            method: 'post',
            params
        });
    }
    storeCheck(params) {
        return axios(this.store.check, {
            method: 'post',
            params
        });
    }
    storeUser(params) {
        return axios(this.store.storeUser, {
            method: 'get',
            params
        });
    }
    //达人
    celebritylist(params) {
        return axios(this.celebrity.list, {
            method: 'get',
            params
        });
    }
    //合伙人
    partnerlist(params) {
        return axios(this.partner.list, {
            method: 'get',
            params
        });
    }
    partnerSetStatus(params) {
        return axios(this.partner.setStatus, {
            method: 'post',
            params
        });
    }
    partnerSetstandard(params) {
        return axios(this.partner.setstandard, {
            method: 'post',
            params
        });
    }

};
export default {
    name: 'user',
    module: new User()
};
