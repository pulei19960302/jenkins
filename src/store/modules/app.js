import Cookies from 'js-cookie';
const app = {
    name: 'app',
    namespaced: true,
    state: {
        sidebar: {
            opened: false
        },
        userImStatus: {
            // 1 忙碌 2 在线 3 离开
            opened: true,
            waitSend:null
        },
    },
    actions: {
        ToggleSideBar: ({ commit, state }) => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            commit('SET_STATE', {
                'sidebar.opened': !state.sidebar.opened
            });
        }
    }
};

export default app;
