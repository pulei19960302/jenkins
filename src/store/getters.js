const getters = {
    // 页面权限：
    menu_permissions: state => state.user.menu_permissions,
    // 操作权限：
    button_permissions: state => state.user.button_permissions,

    get_userInfo: state => state.user.userInfo
}
export default getters;
