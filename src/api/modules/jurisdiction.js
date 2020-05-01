/**
 * Created by hetingfeng on 2018/11/15.
 */

import axios from '../axios';

class Jurisdiction{
    constructor() {
        // 部门管理
        this.admincp_group = {
            list: '/admincp-group/list',
            add: '/admincp-group/add',
            edit: '/admincp-group/edit',
            del: '/admincp-group/del',
            tree:'/admincp-group/tree'
        };
        // 角色管理
        this.role = {
            list: '/role/list',
            add: '/role/add',
            edit: '/role/edit',
            del: '/role/del',
            detail: '/role/detail',
            assign: '/role/assign',
        };
        // 成员管理
        this.admincp_member = {
            list: '/admincp-member/list',
            add: '/admincp-member/add',
            edit: '/admincp-member/edit',
            del: '/admincp-member/del',
            detail: '/admincp-member/detail'
        };
        // 操作日志
        this.operatelog = {
            list: '/operatelog/list'
        };
    }
    // 操作日志
    getOperatelogList(params) {
        return axios(this.operatelog.list, { method: 'get', params });
    }
    // 部门管理
    getAdminGroupList(params) {
        return axios(this.admincp_group.list, { method: 'get', params });
    }
    AddAdminGroup(params) {
        return axios(this.admincp_group.add, { method: 'post', params });
    }
    EditAdminGroup(params) {
        return axios(this.admincp_group.edit, { method: 'post', params });
    }
    DelAdminGroup(params) {
        return axios(this.admincp_group.del, { method: 'post', params });
    }
    tree(params) {
        return axios(this.admincp_group.tree, { method: 'get', params });
    }
    // 角色管理
    getRoleList(params) {
        return axios(this.role.list, { method: 'get', params });
    }
    AddRole(params) {
        return axios(this.role.add, { method: 'post', params });
    }
    EditRole(params) {
        return axios(this.role.edit, { method: 'post', params });
    }
    DelRole(params) {
        return axios(this.role.del, { method: 'post', params });
    }
    roleDetail(params) {
        return axios(this.role.detail, { method: 'get', params });
    }
    roleAssign(params) {
        return axios(this.role.assign, { method: 'post', params });
    }
    // 成员管理
    getAdminMemberList(params) {
        return axios(this.admincp_member.list, { method: 'get', params });
    }
    getAdminMemberDetail(params) {
        return axios(this.admincp_member.detail, { method: 'get', params });
    }
    AddAdminMember(params) {
        return axios(this.admincp_member.add, { method: 'post', params });
    }
    EditAdminMember(params) {
        return axios(this.admincp_member.edit, { method: 'post', params });
    }
    DelAdminMember(params) {
        return axios(this.admincp_member.del, { method: 'post', params });
    }
};
export default {
    name: 'jurisdiction',
    module: new Jurisdiction()
};

